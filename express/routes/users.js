var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).success(function(users) {
    res.send({
      users: users
    });
  });
});

router.post('/', function(req, res) {
  models.User.create({
    username: req.param('username')
  }).success(function(user) {
    res.send({user: user});
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).success(function(user) {
    models.Task.create({
      title: req.param('title')
    }).success(function(title) {
      title.setUser(user).success(function() {
        res.redirect('/');
      });
    });
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).success(function(user) {
    models.Task.find({
      where: { id: req.param('task_id') }
    }).success(function(task) {
      task.setUser(null).success(function() {
        task.destroy().success(function() {
          res.redirect('/');
        });
      });
    });
  });
});


module.exports = router;

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  avatar: DS.attr('string'),
  status: DS.attr('boolean')
});
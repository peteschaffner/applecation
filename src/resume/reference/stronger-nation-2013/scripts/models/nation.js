/*global define*/
define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  var NationModel = Backbone.Model.extend({
    
    initialize: function () {
      this.fetch();
    },
    
    url: 'data/json/report/united-states.json'
    
  });

  return NationModel;
});
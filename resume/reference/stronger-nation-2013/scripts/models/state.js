/*global define*/
define([
  'underscore',
  'backbone',
  'helpers'
], function (_, Backbone, Helpers) {
  var StateModel = Backbone.Model.extend({
    
    initialize: function () {
      var fileName = Helpers.titleCaseToUrl(this.get('name'));
      
      this.url = 'data/json/report/' + fileName + '.json';
      this.fetch();
    }
    
  });

  return StateModel;
});
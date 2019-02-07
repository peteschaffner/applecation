/*global define*/
define([
  'underscore',
  'backbone',
  'd3'
], function (_, Backbone, d3) {
  var TopoModel = Backbone.Model.extend({

    url: 'data/json/topo/topo.json',

    initialize: function () {
      this.fetch({
        // Add county data
        success: function (model) {
          d3.csv('data/csv/counties.csv', function (data) {
            model.set('countyData', data);
          });
        }
      });
    }

  });

  return TopoModel;
});

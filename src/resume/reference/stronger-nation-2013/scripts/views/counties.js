/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'helpers',
  'text!templates/counties.html'
], function ($, _, Backbone, d3, topojson, Helpers, countiesTemplate) {

  var CountiesView = Backbone.View.extend({
    template: _.template(countiesTemplate),

    initialize: function () {
      this.formatPercent = d3.format('.2f');
    },

    render: function () {
      this.$el.show();
      this.$el.html(this.template(this.model.toJSON()));

      var _this = this;
      var data = this.model.get('counties');
      // separate data into chunks of four
      var i, j, tempData = [];
      var count;

      switch(this.model.get('name')) {
        case 'Alaska':
          count = 2;
          break;
        case 'Virginia':
          count = 3;
          break;
        default:
          count = 4;
      }

      if ($(window).width() <= 320) {
        count = 1;
      }

      for (i = 0, j = data.length; i < j; i += count) {
        tempData.push(data.slice(i, i + count));
      }
      data = tempData;


      // draw table
      var cell = d3.select(this.$('.table')[0]).selectAll('tr')
          .data(data)
        .enter().append('tr')
          //.attr('class', function (d, i) {
            //return i % 2 ? 'even' : null;
          //})
        .selectAll('td')
          .data(function (d ) { return d; })
        .enter().append('td')
          .append('div');

      cell.append('span')
        .attr('class', 'name')
        .html(function (d) { return d[0]; });

      cell.append('span')
        .attr('class', 'percent digit last')
        .text(function (d) {
          return _this.formatPercent(Helpers.toFixed(d[1], 2));
        });

      cell.append('span')
        .attr('class', 'bar')
        .style('width', function (d) {
          return _this.formatPercent(Helpers.toFixed(d[1], 2)) + '%';
        });
    }
  });

  return CountiesView;
});



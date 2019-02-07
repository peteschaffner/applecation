/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'helpers',
  'text!templates/trend.html'
], function ($, _, Backbone, d3, topojson, Helpers, trendTemplate) {

  var TrendView = Backbone.View.extend({
    template: _.template(trendTemplate),

    render: function () {
      this.$el.show();
      this.$el.html(this.template(this.model.toJSON()));

      var data = _.map(this.model.get('trend'), function (d) {
        return Helpers.toFixed(d, 1);
      });

      var color = d3.scale.linear()
        .domain([d3.min(data), d3.max(data)])
        .range(['#f99688', '#ec6558'])
        .interpolate(d3.interpolateLab);

      var x = d3.scale.linear()
        .domain([d3.min(data), d3.max(data)])
        .range([d3.min(data), 100]);

      // bars
      var bar = d3.select(this.$('.chart')[0]).selectAll('div')
          .data(data)
        .enter().append('div')
          .attr('class', 'bar digit')
          .style('width', function (d) { return Math.floor(x(d)) + '%'; })
          .style('background-color', function (d) { return color(d); });

      bar.append('span')
        .attr('class', 'year')
        .text(function (d, i) {
          return 2008 + i;
        });

      bar.append('span')
        .attr('class', 'percent')
        .text(function (d) { return d3.format('.1f')(d) + '%'; });

    }

  });

  return TrendView;
});

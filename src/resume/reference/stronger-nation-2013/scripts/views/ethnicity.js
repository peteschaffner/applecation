/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'helpers',
  'text!templates/ethnicity.html'
], function ($, _, Backbone, d3, topojson, Helpers, ethnicityTemplate) {

  var EthnicityView = Backbone.View.extend({
    template: _.template(ethnicityTemplate),

    initialize: function () {
      this.formatPercent = d3.format('.2%');
      this.colors = ['#ec6558', '#795856', '#00a8cb', '#6e858c', '#76ae99'];
    },

    render: function () {
      this.$el.show();
      this.$el.html(this.template(this.model.toJSON()));

      var _this = this;
      var data = _.map(this.model.get('ethnicity'), function (d) {
        return [d];
      });

      var color = d3.scale.ordinal()
        .range(this.colors);

      var x = d3.scale.linear()
        .domain([(d3.min(data)[0] * 100), (d3.max(data)[0] * 100)])
        .range([(d3.min(data)[0] * 100), 100]);

      // bars
      var bars = d3.select(this.$('.chart')[0]).selectAll('div')
          .data(data)
        .enter().append('div')
          .attr('class', 'bar')
          .style('height', function (d) { return Math.floor(x(d * 100)) + '%'; })
          .style('background-color', function (d) { return color(d); });

      bars.append('span')
        .attr('class', 'digit')
        .style('color', function (d) { return color(d); })
        .text(function (d) { return _this.formatPercent(d); });

      // draw table
      var rows = d3.select(this.$('.table')[0]).selectAll('tr')
          .data(data);

      rows.selectAll('.data')
          .data(function (d) { return d; })
        .enter().append('td')
          .attr('class', 'digit last')
          .text(function (d) { return _this.formatPercent(d); });

      // Events
      rows.on('mouseout', function () {
          bars.transition().style('opacity', '1');
        })
        .on('mouseover', function (d, i) {
          bars.transition().style('opacity', '0.3');
          d3.select(bars[0][i]).transition().style('opacity', 1);
        });

      bars.on('mouseout', function () {
          rows.transition().style('opacity', '1');
          bars.transition().style('opacity', '1');
        })
        .on('mouseover', function (d, i) {
          rows.transition().style('opacity', '0.3');
          d3.select(rows[0][i]).transition().style('opacity', 1);
          d3.select(this).transition().style('opacity', 0.8);
        });
    }

  });

  return EthnicityView;
});

/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'helpers',
  'text!templates/levels.html'
], function ($, _, Backbone, d3, topojson, Helpers, levelsTemplate) {

  var LevelsView = Backbone.View.extend({
    template: _.template(levelsTemplate),

    initialize: function () {
      this.formatPercent = d3.format('.2%');
      this.formatComma = d3.format(',');
      this.colors = ['#ec6558', '#795856', '#6e858c', '#76ae99', '#4a5344',
        '#00a8cb', '#c2b59b'];
    },

    render: function () {
      this.$el.show();
      this.$el.html(this.template(this.model.toJSON()));

      var _this = this;
      var data = this.model.get('levels');

      data.forEach(function(d) {
        d[1] = +d[1];
      });

      var color = d3.scale.ordinal()
        .range(this.colors);

      // draw table
      var rows = d3.select(this.$('.table')[0]).selectAll('tr')
          .data(data);

      rows.selectAll('.data')
          .data(function (d) { return d; })
        .enter().append('td')
          .attr('class', function (d, i) {
            return i ? 'digit last' : 'digit';
          })
          .text(function (d, i) {
            return i ? _this.formatPercent(d) : _this.formatComma(d);
          });

      if ($('.lt-ie9').length) {
        // IE8
        var percents = _.map(data, function (d) {
          var percent = _this.formatPercent(d[1]);

          return +percent.replace('%', '');
        });

        var x = d3.scale.linear()
          .domain([d3.min(percents), d3.max(percents)])
          .range([d3.min(percents), 100]);

        var bars = d3.select(this.$('.chart')[0]).selectAll('div')
          .data(data);

        bars.enter().append('div')
          .attr('class', 'bar digit')
          .style('width', function (d, i) {
            return Math.floor(x(percents[i])) + '%';
          })
          .style('background-color', function (d) { return color(d[0]); });

        // Events
        bars.on('mouseout', function () {
            rows.transition().style('opacity', '1');
            bars.transition().style('opacity', '1');
          })
          .on('mouseover', function (d, i) {
            rows.transition().style('opacity', '0.3');
            d3.select(rows[0][i]).transition().style('opacity', 1);
            d3.select(this).transition().style('opacity', 0.8);
          });

        rows.on('mouseout', function () {
            bars.transition().style('opacity', '1');
          })
          .on('mouseover', function (d, i) {
            bars.transition().style('opacity', '0.3');
            d3.select(bars[0][i]).transition().style('opacity', 1);
          });
      } else {
        var width = 288,
            height = 288,
            radius = Math.min(width, height) / 2;

        var svg = d3.select(this.$('.chart')[0]).append('svg')
          .attr('preserveAspectRatio', 'xMidYMid meet')
          .attr('viewBox', '0,0,' + width + ',' + height);

        var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(radius - 50);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function (d) { return d[1]; });

        svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
          .attr('class', 'arcs');

        var arcs = svg.select('g').selectAll('.arc')
            .data(pie(data))
          .enter().append('g')
            .attr('class', function (d, i) {
              return i === 3 ? 'callout' : null;
            });

        // bring callout slice to front
        this.$('.chart .callout').appendTo(this.$('.arcs'));

        // draw arcs
        arcs.append('path')
          .attr('d', arc)
          .style('fill', function (d) { return color(d.data[0]); })
          .style('stroke', '#f8f8f4');

        // draw total label
        svg.append('g')
            .attr('class', 'total')
            .attr('transform',
              'translate(' + width / 2 + ',' + (height / 2 - 10) + ')')
          .append('text')
            .text('Total')
            .style('text-anchor', 'middle')
            .attr('class', 'sans');

        // total #
        svg.select('.total').append('text')
          .text(this.formatComma(
            d3.sum(_.map(data, function (d) { return d[0]; }))))
          .style('text-anchor', 'middle')
          .attr('class', 'digit')
          .attr('transform', 'translate(0, 20)');

        // Events
        arcs.on('mouseout', function () {
            rows.transition().style('opacity', '1');
            arcs.transition().style('fill-opacity', '1');
          })
          .on('mouseover', function (d, i) {
            rows.transition().style('opacity', '0.3');
            d3.select(rows[0][i]).transition().style('opacity', 1);
            d3.select(this).transition().style('fill-opacity', 0.8);
          });

        rows.on('mouseout', function () {
            arcs.transition().style('fill-opacity', '1');
          })
          .on('mouseover', function (d, i) {
            arcs.transition().style('fill-opacity', '0.3');
            d3.select(arcs[0][i]).transition().style('fill-opacity', 1);
          });
      }
    }
  });

  return LevelsView;
});


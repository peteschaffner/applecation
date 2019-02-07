/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'helpers',
  'text!templates/path.html'
], function ($, _, Backbone, d3, topojson, Helpers, pathTemplate) {

  var PathView = Backbone.View.extend({
    template: _.template(pathTemplate),

    initialize: function () {
      this.formatPercent = d3.format('.0%');
      this.parseDate = d3.time.format('%Y').parse;
      this.years = _.map([
        '2011',
        '2013',
        '2015',
        '2017',
        '2019',
        '2021',
        '2023',
        '2025'
      ], function (year) {
        return this.parseDate(year);
      }, this);
    },

    render: function () {
      this.$el.show();
      this.$el.html(this.template(this.model.toJSON()));

      var _this = this;
      // get only the odd years worth of data
      var data = _.map(this.model.get('path'), function (range) {
        return _.filter(range, function (num, i) {
          return (i + 1) % 2 === 1;
        });
      });

      // create our two main data objects
      data = _.map(['target', 'expected'], function (name, i) {
        return {
          name: name,
          values: _.map(data[i], function (d, i) {
            return { year: _this.years[i], y: d / 100 };
          })
        };
      });

      var x;

      if ($('.lt-ie9').length) {
        // IE8
        x = d3.scale.linear()
          .domain([Math.floor(data[0].values[0].y * 100), 60])
          .range([Math.floor(data[0].values[0].y * 100), 100]);

        var groups = d3.select(this.$('.chart')[0]).selectAll('div')
            .data(data)
          .enter().append('div')
            .attr('class', function (d) { return d.name; });

        var bars = groups.selectAll('div')
            .data(function (d) { return d.values; })
          .enter().append('div')
            .attr('class', 'bar digit')
            .style('width', function (d) {
              return Math.floor(x(d.y * 100)) + '%';
            });

        bars.append('span')
          .attr('class', function (d, i) {
            return (i === 7) ? 'year last' : 'year';
          })
          .text(function (d) { return d.year.getFullYear(); });

        bars.append('span')
          .attr('class', function (d, i) {
            return (i === 7) ? 'percent last' : 'percent';
          })
          .text(function (d) { return d3.format('.1%')(d.y); });

      } else {
        var margin = {top: 30, right: 50, bottom: 20, left: 50},
            width = 700 - margin.left - margin.right,
            height = 408 - margin.top - margin.bottom;

        var svg = d3.select(this.$('.chart')[0]).append('svg')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', '0,0,' + (width + margin.left + margin.right) +
              ',' +
              (height + margin.top + margin.bottom))
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        x = d3.time.scale()
          .domain(d3.extent(this.years))
          .range([0, width]);

        var y = d3.scale.linear()
          .domain([data[0].values[0].y, 0.6])
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
          .tickValues(this.years)
          .tickPadding(10)
          .tickSize(height);

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
          .tickValues([0.6])
          .tickFormat(this.formatPercent);

        var area = d3.svg.area()
          .x(function(d) { return x(d.year); })
          .y0(height)
          .y1(function(d) { return y(d.y); });

        // draw shape
        var paths = svg.selectAll('.path')
            .data(data)
          .enter().append('g')
            .attr('class', function (d) { return 'path ' + d.name; });

        paths.append('path')
          .attr('class', 'area')
          .attr('d', function (d) { return area(d.values); });

        // draw x axis
        svg.append('g')
          .attr('class', 'x axis digit')
          .attr('transform', 'translate(0,0)')
          .call(xAxis);

        // draw y axis
        svg.append('g')
          .attr('class', 'y axis digit')
          .call(yAxis);

        // draw dots
        var points = svg.selectAll('.dots')
            .data(data)
          .enter().append('g')
            .attr('class', function (d) { return d.name; })
          .selectAll('g')
            .data(function (d) { return d.values; })
          .enter().append('g')
            .attr('class', 'dot');

        points.append('circle')
          .attr('r', 5)
          .attr('cx', function (d) { return x(d.year); })
          .attr('cy', function (d) { return y(d.y); });

        points.append('text')
          .attr('class', function (d, i) {
            return (i === 7) ? 'label digit last' : 'label digit';
          })
          .attr('x', function (d) {
            return x(d.year) + 7;
          })
          .attr('y', function (d) {
            return y(d.y) - 8;
          })
          .text(function (d) { return d3.format('.1%')(d.y); });

        // Events
        points.on('mouseover', function () {
            d3.select(this).select('circle')
              .transition()
              .attr('r', 7);
          })
          .on('mouseout', function () {
            d3.select(this).select('circle')
              .transition()
              .attr('r', 5);
          });
      }
    }
  });

  return PathView;
});

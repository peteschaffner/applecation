/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'helpers'
], function ($, _, Backbone, d3, topojson, Helpers) {

  var MetrosView = Backbone.View.extend({
    el: '#metros',

    initialize: function () {
      var _this = this;
      // set our data
      d3.tsv('data/csv/metros.tsv', function (data) {
        _this.data = data;
        _this.trigger('ready');
      });

      this.formatPercent = d3.format('.2f');
      this.formatComma = d3.format(',');
    },

    render: function () {
      this.$el.show();

      var _this = this;

      this.data = _.map(this.data, function (row) {
        var last;
        row = _.values(row);
        row.shift();
        last = row.pop();
        row.unshift(last);
        return row;
      });

      var stripe = function (d, i) {
        return i % 2 ? 'odd' : null;
      };

      // sorting functionality
      this.$('th').click(function() {
        var $this = $(this),
            i = $this.index();

        $('#metros th').removeAttr('class');
        $this.addClass('selected');

        tr.sort(function(a, b) {
            if (!i) {
              return a[i] - b[i];
            } else if (i === 2 || i === 3) {
              return b[i] - a[i];
            } else {
              if(a[i] < b[i]) return -1;
              if(a[i] > b[i]) return 1;
              return 0;
            }
          })
          .attr('class', stripe);
      });

      // draw table
      var tr = d3.select(this.$('.table tbody')[0]).selectAll('tr')
          .data(this.data)
        .enter().append('tr')
          .attr('class', stripe);

      tr.selectAll('td')
        .data(function (d) { return d; })
      .enter().append('td')
        .attr('class', function (d, i) {
          return i === 1 ? null : 'digit';
        })
        .style('text-align', function (d, i) {
          return !i ? 'left' : null;
        })
        .text(function (d, i) {
          if (i === 2) return _this.formatPercent(Helpers.toFixed(d, 2)) + '%';
          if (i === 3) return _this.formatComma(d);
          return d.replace(/\smetro\sarea/i, '');
        });
    }
  });

  return MetrosView;
});


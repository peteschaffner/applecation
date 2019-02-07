/*global define*/
define([
  'app',
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'models/topo',
  'helpers'
], function (app, $, _, Backbone, d3, topojson, TopoModel, Helpers) {

  var MapView = Backbone.View.extend({

    el: '#map',

    initialize: function () {
      this.stateCodes = [{'id':10,'name':'delaware'},{'id':12,'name':'florida'},{'id':13,'name':'georgia'},{'id':15,'name':'hawaii'},{'id':16,'name':'idaho'},{'id':17,'name':'illinois'},{'id':18,'name':'indiana'},{'id':19,'name':'iowa'},{'id':20,'name':'kansas'},{'id':21,'name':'kentucky'},{'id':22,'name':'louisiana'},{'id':23,'name':'maine'},{'id':24,'name':'maryland'},{'id':25,'name':'massachusetts'},{'id':26,'name':'michigan'},{'id':27,'name':'minnesota'},{'id':28,'name':'mississippi'},{'id':29,'name':'missouri'},{'id':30,'name':'montana'},{'id':31,'name':'nebraska'},{'id':32,'name':'nevada'},{'id':33,'name':'new-hampshire'},{'id':34,'name':'new-jersey'},{'id':35,'name':'new-mexico'},{'id':36,'name':'new-york'},{'id':37,'name':'north-carolina'},{'id':38,'name':'north-dakota'},{'id':39,'name':'ohio'},{'id':40,'name':'oklahoma'},{'id':41,'name':'oregon'},{'id':42,'name':'pennsylvania'},{'id':44,'name':'rhode-island'},{'id':45,'name':'south-carolina'},{'id':46,'name':'south-dakota'},{'id':47,'name':'tennessee'},{'id':48,'name':'texas'},{'id':49,'name':'utah'},{'id':50,'name':'vermont'},{'id':51,'name':'virginia'},{'id':53,'name':'washington'},{'id':54,'name':'west-virginia'},{'id':55,'name':'wisconsin'},{'id':56,'name':'wyoming'},{'id':2,'name':'alaska'},{'id':1,'name':'alabama'},{'id':5,'name':'arkansas'},{'id':4,'name':'arizona'},{'id':6,'name':'california'},{'id':8,'name':'colorado'},{'id':9,'name':'connecticut'}];

      this.width = 960;
      this.height = 492;

      this.quantize = d3.scale.quantize()
          .domain([0, 50])
          .range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));

      this.path = d3.geo.path();
      this.svg = d3.select(this.$el[0]).append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height);

      this.percentsById = {};
      this.model = new TopoModel();
      this.model.once('change:countyData', function () {
        // populate percentsById
        _.each(this.model.get('countyData'), function (d) {
          this.percentsById[d.id] = +d.percent;
        }, this);

        this.render();
        this.update(this.options.name);
      }, this);
    },

    render: function () {
      // for anonymous functions passed as params or callbacks
      var _this = this;

      // draw county shapes
      this.svg.append('g')
          .attr('class', 'counties')
        .selectAll('path')
          .data(topojson.object(this.model.attributes, this.model.get('objects').counties).geometries)
        .enter().append('path')
          .attr('class', function(d) {
            var stateId = (d.id.length === 4) ? d.id.slice(0, 1) : d.id.slice(0, 2);
            return _this.quantize(_this.percentsById[d.id]) + ' fips' + stateId;
          })
          .attr('d', this.path);

      // draw state shapes
      this.svg.append('g')
          .attr('class', 'states')
        .selectAll('path')
          .data(topojson.object(this.model.attributes, this.model.get('objects').states).geometries)
        .enter().append('path')
          .attr('id', function(d) {
            return 'fips' + d.id;
          })
          .attr('d', this.path)
        .append('title')
          .text(function (d) {
            return Helpers.urlToTitleCase(_.find(_this.stateCodes, function (state) {
              return +state.id === +d.id;
            }).name);
          });

      // setup click handlers for states
      $('.states path').click(function () {
        var id = $(this).attr('id').replace('fips', '');
        var url = _.find(_this.stateCodes, function (state) { return state.id === +id; }).name;
        if (window.location.pathname.indexOf('.html') >= 0) {
          window.location = './#' + url;
        } else {
          app.router.navigate(url, {trigger: true});
          $('html, body').animate({ scrollTop: $('#chooser').offset().top }, 1000);
        }
      });

      // draw state border lines
      this.svg.append('path')
          .datum(topojson.mesh(this.model.attributes, this.model.get('objects').states, function(a, b) {
            return a.id !== b.id;
          })).attr('class', 'state-lines')
          .attr('d', this.path);

      // draw metro shapes
      this.svg.insert('g', '.states')
          .attr('class', 'metros')
        .selectAll('path')
          .data(topojson.object(this.model.attributes, this.model.get('objects').metros).geometries)
        .enter().append('path')
          .attr('d', this.path);
    },

    update: function (name) {
      // clear states
      d3.selectAll('.counties path, .states path').classed('selected', false);
      // clear metros
      d3.select('.metros').classed('active', false);

      if (name) { // this is a state or metro view
        this.$el.addClass('grey');

        if (name === 'metro') {
          // color metros
          d3.select('.metros').classed('active', true);
        } else {
          var id = _.find(this.stateCodes, function (state) {
              return state.name === Helpers.titleCaseToUrl(name);
            }).id;

          // color our current state
          d3.selectAll('.fips' + id + ', #fips' + id).classed('selected', true);
        }
      } else {
        // if no name passed, this is a nation view
        this.$el.removeClass('grey');
      }

      // reveal content and hide spinner
      this.$el.css('opacity', 1);
      app.appView.spinner.stop();
    }
  });

  return MapView;
});

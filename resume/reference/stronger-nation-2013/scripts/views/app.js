/*global define*/
define([
  'app',
  'spin',
  'jquery',
  'underscore',
  'backbone',
  'helpers',
  'collections/nation',
  'models/nation',
  'models/state',
  'views/counties',
  'views/dialog',
  'views/ethnicity',
  'views/levels',
  'views/map',
  'views/metros',
  'views/path',
  'views/trend'
], function (app, Spinner, $, _, Backbone, Helpers, StateCollection, NationModel,
  StateModel, CountiesView, DialogView, EthnicityView, LevelsView, MapView,
  MetrosView, PathView, TrendView) {

  var AppView = Backbone.View.extend({

    el: 'body',

    events: {
      'click #toc': 'toggleToc',
      'change #chooser': 'navigate',
      'click .overlay, .dialog .close': 'downloadDialog',
      'click #top': 'toTop'
    },

    initialize: function () {
      // enable css transitions after page load
      this.$el.removeClass('preload');

      // reveal/hide toTop btn
      var $window = $(window);
      if ($window.width() > 320) {
        $window.scroll(function () {
          if ($window.scrollTop() > 468) {
            $('#top').show();
          } else {
            $('#top').hide();
          }
        });
      }

      this.spinner = new Spinner({
        lines: 13, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 23, // The radius of the inner circle
        corners: 0, // Corner roundness (0..1)
        color: '#76ae99', // #rgb or #rrggbb
        trail: 60, // Afterglow percentage
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner' // The CSS class to assign to the spinner
      }).spin($('#header')[0]);

      // our collection of states
      this.stateCollection = new StateCollection();

      // all our subviews
      this.dialogView = new DialogView();
      this.trendView = new TrendView();
      this.levelsView = new LevelsView();
      this.ethnicityView = new EthnicityView();
      this.pathView = new PathView();
      this.countiesView = new CountiesView();
    },

    navigate: function () {
      var dataUrl = this.$('#chooser').find(':selected').data('url');
      app.router.navigate(dataUrl, {trigger: true});
    },

    updateChooser: function () {
      $('#data-title').text($('#chooser').val());
    },

    downloadDialog: function (e) {
      $('.dialog').hide();
      e.preventDefault();
    },

    homescreenDialog: function (type, url) {
      var $dialog = $('.dialog');

      $('.downloads').hide();
      $('.device-name').text(type);
      $('.homescreen a').attr('href', url);
      $('.homescreen').show();
      $dialog.show();
      console.log(url);
      return false;
    },

    toggleToc: function (e) {
      this.$('#main-nav').toggleClass('open');
      e.preventDefault();
    },

    toTop: function (e) {
      $('html, body').animate({ scrollTop: 0 }, 1000);
      e.preventDefault();
    },

    renderMap: function (name) {
      if (this.mapView) {
        this.mapView.update(name);
      } else { // fresh page load
        this.mapView = new MapView({ name: name });
      }
    },

    renderNation: function () {
      // grab our nation model for sending to our subviews
      var model = this.getModel('nationModel');

      // hide main content while we are rendering
      this.$('#main').css('opacity', 0);

      if (!model.fresh) {
        // set chooser value
        this.$('#chooser').val('National');
        this.updateChooser();

        // hide subviews
        this.$('#counties, #metros').hide();

        // show appropriate copy
        this.$('#intro .wrap').hide();
        this.$('#nation-copy').show();

        this.trendView.model = model.data;
        this.levelsView.model = model.data;
        this.ethnicityView.model = model.data;
        this.pathView.model = model.data;
        this.dialogView.model.set({
          name: 'full report',
          path: 'a-stronger-nation',
          ebook: true
        });

        // render subviews
        this.assign({
          '#downloads': this.dialogView,
          '#nation-copy .trend': this.trendView,
          '#levels': this.levelsView,
          '#ethnicity': this.ethnicityView,
          '#path': this.pathView
        });

        // nit-picky visual stuff
        this.$el.removeAttr('class').addClass('nation');
        this.$('#main').css('opacity', 1);
      } else { // model doesnt yet exist
        model.data.once('sync', this.renderNation, this);
      }
    },

    renderState: function (state) {
      var stateName = Helpers.urlToTitleCase(state);
      // get the state model for sending to our subviews
      var model = this.getModel(stateName);

      // hide main content while we are rendering
      this.$('#main').css('opacity', 0);

      if (!model.fresh) {
        // set chooser value
        this.$('#chooser').val(stateName);
        this.updateChooser();

        // hide subviews
        this.$('#metros').hide();

        // show appropriate copy
        this.$('#intro .wrap, .state-copy').hide();
        this.$('.' + state).show();
        this.$('#state-copy').show();

        this.trendView.model = model.data;
        this.levelsView.model = model.data;
        this.ethnicityView.model = model.data;
        this.countiesView.model = model.data;
        this.pathView.model = model.data;
        this.dialogView.model.set({
          name: stateName,
          path: state + '-brief',
          ebook: false
        });

        // render subviews
        this.assign({
          '#downloads': this.dialogView,
          '#state-copy .trend': this.trendView,
          '#levels': this.levelsView,
          '#ethnicity': this.ethnicityView,
          '#path': this.pathView,
          '#counties': this.countiesView
        });

        // nit-picky visual stuff
        this.$el.removeAttr('class');
        this.$('#main').css('opacity', 1);
      } else { // model doesnt yet exist
        model.data.once('sync', function () {
          this.renderState(state);
        }, this);
      }
    },

    renderMetro: function () {
      // hide main content while we are rendering
      this.$('#main').css('opacity', 0);

      if (this.metrosView) {
        // set chooser value
        this.$('#chooser').val('Metro-region');
        this.updateChooser();

        // hide subviews
        this.$('#trend, #levels, #ethnicity, #counties, #path').hide();

        // show appropriate copy
        this.$('#intro .wrap').hide();
        this.$('#metro-copy').show();

        this.dialogView.model.set({
          name: 'Metro-regions',
          path: 'metro-regions-brief',
          ebook: false
        });

        // render subviews
        this.assign({
          '#downloads': this.dialogView,
          '#metros': this.metrosView
        });

        // nit-picky visual stuff
        this.$el.removeAttr('class').addClass('metro');
        this.$('#main').css('opacity', 1);
      } else { // fresh page load
        this.metrosView = new MetrosView();

        this.metrosView.once('ready', this.renderMetro, this);
      }
    },

    renderStatic: function () {
      this.mapView = new MapView();
    },

    // return the model we want if it exists
    // ...else create it and then return it
    getModel: function (modelName) {
      if (modelName === 'nationModel') {
        if (this.nationModel) return { fresh: false, data: this.nationModel };

        // no model exists so we must create it
        return { fresh: true, data: this.nationModel = new NationModel() };
      } else {
        var getStateModel = function (collection) {
          return collection.find(function (state) {
            return state.get('name') === modelName;
          });
        };

        var stateModel = getStateModel(this.stateCollection);

        if (stateModel)
          return {
            fresh: false,
            data: this.stateCollection.get(stateModel)
          };

        // no model exists so me must create one and add it to the collection
        return {
          fresh: true,
          data: this.stateCollection.add({name: modelName})
        };
      }
    },

    // A little helper for sub-views
    assign : function (selector, view) {
      var selectors;
      if (_.isObject(selector)) {
        selectors = selector;
      }
      else {
        selectors = {};
        selectors[selector] = view;
      }
      if (!selectors)return;
      _.each(selectors, function (view, selector) {
        view.setElement(this.$(selector)).render();
      }, this);
    }

  });

  return AppView;
});


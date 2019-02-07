// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    d3: {
      exports: 'd3'
    },
    topojson: {
      exports: 'topojson'
    }
  },
  paths: {
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    backbone: '../components/backbone/backbone',
    d3: '../components/d3/d3',
    topojson: '../components/topojson/topojson',
    spin: '../components/spin.js/spin',
    text: '../components/requirejs-text/text'
  }
});

require([
  'app',
  'jquery',
  'backbone',
  'router',
  'views/app'
], function (app, $, Backbone, Router, AppView) {
  $(function () {
    // Initialize the application view
    app.appView = new AppView();
    // Initialize routing and start Backbone.history()
    app.router = new Router();
    Backbone.history.start();
  });
});

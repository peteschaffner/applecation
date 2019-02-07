/*global define*/
define([
  'app',
  'jquery',
  'backbone',
  'views/app'
], function (app, $, Backbone) {
  var Router = Backbone.Router.extend({

    initialize: function () {
      // for regex routes, we have to add them like this
      this.route(/^.+\.html$/, 'static');

      function writeCookie(type, url) {
        if(document.cookie.indexOf('sn2013_has_visited=true') === -1) {
          var date = new Date();

          date.setTime(date.getTime()+(30*24*60*60*1000));
          document.cookie = 'sn2013_has_visited=true; expires= ' + date.toGMTString() + '; path=/';
          app.appView.homescreenDialog(type, url);
        }
      }

      // read/write cookies and display installation help dialog
      if(navigator.userAgent.match(/i(Phone|Pod|Pad)/i)) {
        writeCookie('iOS', 'http://www.apple.com/ios/add-to-home-screen/');
      } else if(navigator.userAgent.match(/android/i)) {
        writeCookie('Android', 'http://howto.cnet.com/8301-11310_39-57416489-285/how-to-add-chrome-for-android-bookmarks-to-your-home-screen/');
      }
    },

    routes: {
      '': 'nation',
      'nation': 'nation',
      'metro': 'metro',
      ':name': 'state'
    },

    mobileInstructions: function () {

    },

    nation: function () {
      app.appView.renderMap();
      app.appView.renderNation();
    },

    state: function (name) {
      app.appView.renderMap(name);
      app.appView.renderState(name);
    },

    metro: function () {
      app.appView.renderMap('metro');
      app.appView.renderMetro();
    },

    static: function () {
      app.appView.renderStatic();
    }

  });

  return Router;
});

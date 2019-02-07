/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'topojson',
  'helpers',
  'text!templates/downloads.html'
], function ($, _, Backbone, d3, topojson, Helpers, downloadsTemplate) {
  var DialogView = Backbone.View.extend({
    template: _.template(downloadsTemplate),

    initialize: function () {
      var DownloadModel = Backbone.Model.extend({});

      this.model = new DownloadModel();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));

      this.$('.ebook').click(function (e) {
        $('.downloads').show();
        $('.homescreen').hide();
        $('.dialog').toggle();
        e.preventDefault();
      });
    }

  });

  return DialogView;
});

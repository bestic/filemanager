/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/file'
], function($, _, Backbone, JST, FileView) {
  'use strict';

  var FileManagerView = Backbone.View.extend({

    template: JST['app/scripts/templates/file-manager.ejs'],

    el: '.content',

    events: {},

    // List of files
    collection: null,

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addFile);
    },

    render: function() {
      this.$el.html(this.template());
    },

    addFile: function(model) {
      var fileView = new FileView({
        model: model
      });
      this.$('table tbody').append(fileView.render().$el);
    }

  });

  return FileManagerView;
});

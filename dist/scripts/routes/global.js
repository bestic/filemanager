/*global define*/

define([
  'jquery',
  'backbone',
  'collections/file',
  'views/file-manager',
  'json!fm.json'
], function($, Backbone, FileCollection, FileManagerView, data) {
  'use strict';

  var GlobalRouter = Backbone.Router.extend({
    routes: {
      'file-manager': 'fileManager',
      'file-manager/list': 'fileManagerList',
      '*any': "unregistered"
    },

    // Currently outputted view
    activeView: null,

    unregistered: function() {
      Backbone.history.navigate('/file-manager', {trigger: true, replace: true});
    },

    fileManager: function() {
      Backbone.history.navigate('/file-manager/list', {trigger: true, replace: true});
    },

    fileManagerList: function() {

      this.destroyActiveView();

      var model = new Backbone.Model({
        'sort-field': null,
        'sort-direction': 'asc'
      });

      var fileCollection = new FileCollection(data.files);
      this.activeView = new FileManagerView({
        model: model,
        collection: fileCollection
      });
      $('.content').html(this.activeView.render().$el);

    },

    destroyActiveView: function() {
      if (this.activeView) {
        this.activeView.destroy();
      }
    }


  });

  return GlobalRouter;
});

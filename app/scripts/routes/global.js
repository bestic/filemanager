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

    unregistered: function() {
      Backbone.history.navigate('/file-manager', {trigger: true, replace: true});
    },

    fileManager: function() {
      Backbone.history.navigate('/file-manager/list', {trigger: true, replace: true});
    },

    fileManagerList: function() {

      var fileCollection = new FileCollection();
      var fileManagerView = new FileManagerView({
        collection: fileCollection
      });
      fileManagerView.render();

      fileCollection.add(data.files);

    }


  });

  return GlobalRouter;
});

/*global require*/
'use strict';

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    text: '../bower_components/requirejs-text/text',
    json: '../bower_components/requirejs-plugins/src/json',
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
  }
});

require([
  'backbone',
  'routes/global'
], function(Backbone, GlobalRouter) {
  new GlobalRouter();
  Backbone.history.start();
});


// File list (sorting, filtering)
// File (download, add to bookmark, preview, edit, create)
// Bookmarks
// Create File

///file-manager/list?q=Test&sort=name&dir=asc
///file-manager/bookmarks/
///file-manager/add
///file-manager/edit
///file-manager/preview
//
//
//FileCollection
//FileModel
//
//
//FileCollectionView




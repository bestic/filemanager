/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'toastr',
  'models/file',
  'views/file',
  'views/file-view',
  'views/file-edit'
], function($, _, Backbone, JST, toastr, FileModel, FileView, FileViewView, FileEditView) {
  'use strict';

  var FileManagerView = Backbone.View.extend({

    template: JST['app/scripts/templates/file-manager.ejs'],

    tag: 'div',

    events: {
      'click table thead a': 'changeSorting',
      'click table tbody tr': 'selectFile',
      'click .btn-show-all': 'showAll',
      'click .btn-show-bookmarked': 'showBookmarked',
      'click .btn-create': 'create',

      'click .btn-bookmark': 'addToBookmark',
      'click .btn-preview': 'preview',
      'click .btn-edit': 'edit',
      'click .btn-delete': 'remove'

    },

    bindings: {
      '[name=filter-name]': 'filter-name',
      '.actions-select': {
        observe: 'active',
        visible: function(value) {
          if (!value) {
            return true;
          }
          return false
        }
      },
      '.actions': {
        observe: 'active',
        visible: function(value) {
          if (value) {
            return true;
          }
          return false
        }
      },
      '.selected-file': {
        observe: 'active',
        onGet: function(value) {
          if (!value) {
            return;
          }
          return this.collection.get(value).get('name');
        }
      },
      '[data-sort-field=name] .glyphicon-chevron-up': {
        observe: ['sort-field', 'sort-direction'],
        visible: function(values) {
          return values[0] === 'name' && values[1] === 'desc';
        }
      },
      '[data-sort-field=name] .glyphicon-chevron-down': {
        observe: ['sort-field', 'sort-direction'],
        visible: function(values) {
          return values[0] === 'name' && values[1] === 'asc';
        }
      },
      '[data-sort-field=type] .glyphicon-chevron-up': {
        observe: ['sort-field', 'sort-direction'],
        visible: function(values) {
          return values[0] === 'type' && values[1] === 'desc';
        }
      },
      '[data-sort-field=type] .glyphicon-chevron-down': {
        observe: ['sort-field', 'sort-direction'],
        visible: function(values) {
          return values[0] === 'type' && values[1] === 'asc';
        }
      },
      '[data-sort-field=size] .glyphicon-chevron-up': {
        observe: ['sort-field', 'sort-direction'],
        visible: function(values) {
          return values[0] === 'size' && values[1] === 'desc';
        }
      },
      '[data-sort-field=size] .glyphicon-chevron-down': {
        observe: ['sort-field', 'sort-direction'],
        visible: function(values) {
          return values[0] === 'size' && values[1] === 'asc';
        }
      }

    },

    // List of files
    workCollection: null,

    // Initial list of files
    collection: null,

    // File Manager Model
    // model.sort-field - current field with sorting
    // model.sort-direction - order
    // model.filter-name
    // model.filter-bookmarked
    // model.active
    model: null,


    // Array of all created views, need to properly destroy them
    fileViews: [],

    initialize: function() {

      this.workCollection = this.collection.clone();

      this.listenTo(this.workCollection, 'sort', this.renderAllFiles);
      this.listenTo(this.workCollection, 'reset', this.renderAllFiles);


      this.listenTo(this.model, 'change:sort-field', this.sort);
      this.listenTo(this.model, 'change:sort-direction', this.sort);
      this.listenTo(this.model, 'change:filter-name', this.filterByName);
    },

    render: function() {
      this.$el.html(this.template());

      this.stickit();
      this.renderAllFiles(this.workCollection);
      return this;
    },

    create: function() {

      var fileEditView = new FileEditView({
        model: new FileModel({
          'type': 'txt',
          'bookmarked': false
        })
      });

      this.listenTo(fileEditView, 'save', function(model) {
        this.collection.add(model);
        toastr.success('File was Successfully Added');
        this.filter();
      });

      this.$el.append(fileEditView.$el);

    },

    addToBookmark: function() {

      var model = this.collection.get(this.model.get('active'));
      if (!model) {
        return;
      }

      model.set('bookmarked', !model.get('bookmarked'));
      if (model.get('bookmarked')) {
        toastr.success('File was successfully added to bookmarks');
      } else {
        toastr.success('File was successfully removed from bookmarks');
      }

    },

    preview: function() {

      var model = this.collection.get(this.model.get('active'));
      if (!model) {
        return;
      }

      var fileViewView = new FileViewView({
        model: model
      });

      this.$el.append(fileViewView.$el);
    },

    edit: function() {

      var model = this.collection.get(this.model.get('active'));
      if (!model) {
        return;
      }

      var fileEditView = new FileEditView({
        model: model
      });

      this.listenTo(fileEditView, 'save', function(model) {
        toastr.success('File was Successfully Updated');
        this.filter();
      });

      this.$el.append(fileEditView.$el);
    },

    remove: function() {

      var model = this.collection.get(this.model.get('active'));
      if (!model) {
        return;
      }

      this.collection.reset(this.collection.without(model));
      this.filter();

    },

    showAll: function() {
      this.model.set('filter-bookmarked', null);
      this.filter();
    },

    showBookmarked: function() {
      this.model.set('filter-bookmarked', true);
      this.filter();
    },

    filterByName: function() {
      this.filter();
    },

    filter: function() {

      var filteredModels = this.collection.models;

      // Filtering By Bookmark
      if (this.model.get('filter-bookmarked')) {
        filteredModels = _.filter(filteredModels, function(model) {
          return model.get('bookmarked') === true;
        })
      }

      // Filtering By Name
      if (this.model.get('filter-name')) {

        var value = this.model.get('filter-name');

        // Escape charactes that can be used in Regexp
        value = value.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        // Create regexp with only *
        value = '^' + value.replace(/\*/g, '.*') + '$';
        var regexp = new RegExp(value);

        filteredModels = _.filter(filteredModels, function(model) {
          return regexp.test(model.get('name'))
        });
      }

      this.workCollection.reset(filteredModels);

      // Checking if selected file remain in list
      if (this.model.get('active') && !this.workCollection.get(this.model.get('active'))) {
          this.model.set('active', null);
      }


    },

    changeSorting: function(e) {
      var field = $(e.target).data('sortField');
      if (this.model.get('sort-field') === field) {
        if (this.model.get('sort-direction') === 'asc') {
          this.model.set('sort-direction', 'desc');
        } else {
          this.model.set('sort-direction', 'asc');
        }
      } else {
        this.model.set('sort-field', field);
        this.model.set('sort-direction', 'asc');
      }
    },

    selectFile: function(e) {

      var cid = $(e.target).closest('tr').data('cid');
      if (!cid) {
        return;
      }

      var model = this.workCollection.get(cid);

      if (cid === this.model.get('active')) {
        this.model.set('active', null);
        model.set('active', false);
      } else {
        _.each(this.workCollection.models, function(model) {
          model.set('active', false);
        });
        this.model.set('active', cid);
        model.set('active', true);

      }

    },

    sort: function(model) {
      this.workCollection.sortField = model.get('sort-field');
      this.workCollection.sortDirection = model.get('sort-direction');
      this.workCollection.sort();
    },

    renderAllFiles: function(collection) {

      this.removeAllFiles();
      _.each(collection.models, function(model) {
        this.addFile(model);
      }, this);

    },

    addFile: function(model) {

      var fileView = new FileView({
        model: model
      });

      this.fileViews.push(fileView);
      this.$('table tbody').append(fileView.render().$el);
    },

    removeAllFiles: function() {

      _.each(this.fileViews, function(fileView) {
        fileView.remove();
      }, this);
      // Clear array
      this.fileViews.splice(0,this.fileViews.length);

    },

    destroy: function() {
      this.removeAllFiles();
      this.remove();
    }

  });

  return FileManagerView;
});

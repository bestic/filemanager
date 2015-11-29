/*global define*/

define([
  'underscore',
  'backbone',
  'models/file'
], function(_, Backbone, FileModel) {
  'use strict';

  var FileCollection = Backbone.Collection.extend({

    sortField: null,
    sortDirection: null,

    comparator: function(el1, el2) {
      if (!this.sortField || !this.sortDirection) {
        return;
      }

      if (this.sortDirection === 'asc') {
        return el1.get(this.sortField) > el2.get(this.sortField) ? 1 : -1;
      } else {
        return el1.get(this.sortField) < el2.get(this.sortField) ? 1 : -1;
      }


    },

    model: FileModel
  });

  return FileCollection;
});

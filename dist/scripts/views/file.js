/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function($, _, Backbone, JST) {
  'use strict';

  var FileView = Backbone.View.extend({
    template: JST['app/scripts/templates/file.ejs'],

    tagName: 'tr',

    attributes : {
      'data-cid'  : ''
    },

    bindings: {
      '.bookmarked .glyphicon-bookmark': {
        observe: 'bookmarked',
        visible: true
      },
      '.file-name': 'name',
      '.file-type': 'type',
      '.file-size': {
        observe: 'size',
        onGet: function(value) {
          return (value/100).toFixed(2);
        }
      },
      ':el': {
        attributes: [{
          name: 'class',
          observe: 'active',
          onGet: function(value) {
            return value ? 'active': '';
          }
        }]

      }
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      $(this.el).data('cid', this.model.cid);

      this.stickit();

      return this;
    }
  });

  return FileView;
});

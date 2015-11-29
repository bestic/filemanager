define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function($, _, Backbone, JST) {
  'use strict';

  var FileViewView = Backbone.View.extend({

    template: JST['app/scripts/templates/file-view.ejs'],

    events: {
      'hidden.bs.modal .modal': 'destroyModal',
    },

    bindings: {
      '.content': 'content'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.$('.modal').modal();

      this.stickit();

      return this;
    },

    destroyModal: function() {
      this.remove();
    }



  });

  return FileViewView;

});

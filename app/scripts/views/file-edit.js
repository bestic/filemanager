define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function($, _, Backbone, JST) {
  'use strict';

  var FileEditView = Backbone.View.extend({

    template: JST['app/scripts/templates/file-edit.ejs'],

    events: {
      'hidden.bs.modal .modal': 'destroyModal',
      'click .btn-primary': 'save'
    },

    bindings: {
      '#file-name': 'name',
      '#content': 'content'
    },

    initialize: function() {
      this.model.on('change:content', this.updateSize, this);
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.$('.modal').modal();

      this.stickit();

      return this;
    },

    updateSize: function() {
      this.model.set('size', this.model.get('content').length);
    },

    save: function() {
      this.trigger('save', this.model);
      this.$('.modal').modal('hide');
    },

    destroyModal: function() {
      this.remove();
    }



  });

  return FileEditView;

});

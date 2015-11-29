/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var FileModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
          this.set('active', false);
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return FileModel;
});

/*global define*/

define([
    'underscore',
    'backbone',
    'models/file'
], function (_, Backbone, FileModel) {
    'use strict';

    var FileCollection = Backbone.Collection.extend({
        model: FileModel
    });

    return FileCollection;
});

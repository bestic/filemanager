define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/file-edit.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="file-manager-edit modal fade">\n  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title" id="myModalLabel">Create New Text File</h4>\n      </div>\n      <div class="modal-body">\n\n        <form>\n          <div class="form-group">\n            <label for="file-name">File Name</label>\n            <input type="text" class="form-control" id="file-name" placeholder="File Name">\n          </div>\n          <div class="form-group">\n            <label for="content">Content</label>\n            <textarea class="form-control" id="content" rows="10"></textarea>\n          </div>\n        </form>\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/file-manager.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="file-manager-list">\n\n  <div class="row">\n    <div class="col-sm-9">\n\n      <table class="table table-hover">\n        <thead>\n        <tr>\n          <th style="min-width: 36px;"></th>\n          <th style="width: 60%">\n            <a data-sort-field="name">\n              File Name\n              <span class="glyphicon glyphicon-chevron-up"></span>\n              <span class="glyphicon glyphicon-chevron-down"></span>\n            </a>\n\n          </th>\n          <th style="width: 20%">\n            <a data-sort-field="type">\n              File Type\n              <span class="glyphicon glyphicon-chevron-up"></span>\n              <span class="glyphicon glyphicon-chevron-down"></span>\n            </a>\n          </th>\n          <th style="width: 20%">\n            <a data-sort-field="size">\n              Size (Kb)\n              <span class="glyphicon glyphicon-chevron-up"></span>\n              <span class="glyphicon glyphicon-chevron-down"></span>\n            </a>\n          </th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr>\n          <td>\n          </td>\n          <td>\n            <div class="form-group">\n              <div class="input-group">\n                <input type="text" name="filter-name" class="form-control" placeholder="Type to filter">\n                <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>\n              </div>\n            </div>\n          </td>\n          <td></td>\n          <td></td>\n        </tr>\n        </tbody>\n      </table>\n\n    </div>\n    <div class="col-sm-3 actions-holder">\n\n      <div class="title">Actions</div>\n\n      <div class="actions-select">\n        Select file at the left side by clicking on it\n      </div>\n\n      <div class="actions" style="display: none;">\n        <div class="selected-file-holder">\n          <span class="selected-file-holder-title">Selected File:</span>\n          <span class="selected-file"></span>\n        </div>\n\n        <div class="action">\n          <button class="btn btn-sm btn-success btn-bookmark" title="Add To Bookmark">\n            <span class="glyphicon glyphicon-bookmark"></span> Bookmark\n          </button>\n        </div>\n\n        <div class="action">\n          <button class="btn btn-sm btn-success btn-preview" title="Preview">\n            <span class="glyphicon glyphicon-eye-open"></span> Preview\n          </button>\n        </div>\n\n        <div class="action">\n          <button class="btn btn-sm btn-success btn-edit" title="Edit">\n            <span class="glyphicon glyphicon-pencil"></span> Edit\n          </button>\n        </div>\n\n        <div class="action">\n          <button class="btn btn-sm btn-danger  btn-delete" title="Download">\n            <span class="glyphicon glyphicon-remove"></span> Remove\n          </button>\n        </div>\n\n      </div>\n\n\n    </div>\n\n  </div>\n\n\n  <div class="row">\n\n    <div class="col-sm-12">\n\n      <div class="global-actions clearfix">\n        <div class="global-actions-leftgroup pull-left">\n          <a class="btn btn-default btn-show-all">\n            <span class="glyphicon glyphicon-list"></span>\n            File List\n          </a>\n          <a class="btn btn-default btn-show-bookmarked">\n            <span class="glyphicon glyphicon-bookmark"></span>\n            Bookmarks\n          </a>\n        </div>\n        <div class="global-actions-leftgroup pull-right">\n          <button class="btn btn-default" style="display: none;">\n            <span class="glyphicon glyphicon-upload"></span>\n            Upload\n          </button>\n          <button class="btn btn-default btn-create">\n            <span class="glyphicon glyphicon-plus"></span>\n            Create New\n          </button>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n</div>\n\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/file-view.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="file-manager-edit modal fade">\n  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title" id="myModalLabel">Text File Preview</h4>\n      </div>\n      <div class="modal-body">\n\n        <div class="content"></div>\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/file.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '  <td>\n    <span class="bookmarked">\n      <span class="glyphicon glyphicon-bookmark"></span>\n    </span>\n  </td>\n  <td>\n    <span class="file-name"></span>\n  </td>\n  <td class="file-type"></td>\n  <td class="file-size"></td>\n';

}
return __p
};

  return this["JST"];

});
/**
 * Based on url-loader (https://github.com/webpack/url-loader)
 */
var loaderUtils = require('loader-utils');
var mime = require('mime');
var extend = require('object-assign');
var defaultPresets = require('./presets.js');

module.exports = function (content) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var limit = (this.options && this.options.advancedUrl && this.options.advancedUrl.dataUrlLimit) || 0;

  if (query.limit)
    limit = parseInt(query.limit, 10);

  var mimetype = query.mimetype || mime.lookup(this.resourcePath);
  var presets = extend({}, defaultPresets, this.options.advancedUrl || {});
  var preset = mimetype in presets ? presets[mimetype] : null;

  if (limit <= 0 || content.length < limit) {
    var result = preset
      ? preset(content)
      : JSON.stringify('data:' + (mimetype ? mimetype + ';' : '') + 'base64,' + content.toString('base64'));

    return 'module.exports = ' + result;
  } else {
    var fileLoader = require('file-loader');
    return fileLoader.call(this, content);
  }
};

module.exports.raw = true;
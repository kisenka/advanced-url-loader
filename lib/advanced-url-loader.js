/**
 * Based on url-loader (https://github.com/webpack/url-loader)
 */
var loaderUtils = require('loader-utils');
var mime = require('mime');
var extend = require('object-assign');
var defaultHandlers = require('./handlers.js');

module.exports = function (content) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var limit = (this.options && this.options.advancedUrl && this.options.advancedUrl.dataUrlLimit) || 0;

  if (query.limit)
    limit = parseInt(query.limit, 10);

  var mimetype = query.mimetype || mime.lookup(this.resourcePath);
  var handlers = extend({}, defaultHandlers, this.options.advancedUrl.handlers || {});
  var handler = mimetype in handlers ? handlers[mimetype] : null;

  if (limit <= 0 || content.length < limit) {
    var result = handler
      ? handler(content)
      : JSON.stringify('data:' + (mimetype ? mimetype + ';' : '') + 'base64,' + content.toString('base64'));

    return 'module.exports = ' + result;
  } else {
    var fileLoader = require('file-loader');
    return fileLoader.call(this, content);
  }
};

module.exports.raw = true;
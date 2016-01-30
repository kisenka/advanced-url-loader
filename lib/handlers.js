module.exports = {
  'image/svg+xml': function (content) {
    return 'data:image/svg+xml,' + encodeURIComponent(content);
  }
};
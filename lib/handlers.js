module.exports = {
  'image/svg+xml': function (content) {
    var encoded = encodeURIComponent(content)
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29');

    return 'data:image/svg+xml,' + encoded;
  }
};
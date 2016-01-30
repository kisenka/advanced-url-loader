# Advanced url loader for Webpack

> Based on [url-loader](https://github.com/webpack/url-loader)

Works exactly like [url-loader](https://github.com/webpack/url-loader) but allows to specify
how encode specific MIME-type. For example for SVG [there is no necessary to encode source in base64](https://css-tricks.com/probably-dont-base64-svg),
because it works with raw content encoded with `encodeURIComponent` as well. It will decrease ~30% of
content length and save browser resources for unpacking base64 string.

## Configuration

For compatibility with url-loader `advancedUrl` option is used:

```js
{
  module: {
    loaders: [
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'advanced-url?limit=10000'
      }
    ]
  },
  advancedUrl: {
    handlers: {
      'image/svg+xml': function (content) {
        return 'data:image/svg+xml,' + encodeURIComponent(content);
      }
    }
  }
}
```

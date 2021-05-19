const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");

module.exports = withSass(withCss({
  // future: {
  //   webpack5: true,
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'static': resolve('static'),
      'styles': resolve('styles'),
      'pages': resolve('pages'),
      'configs': resolve('configs'),
      'common': resolve('common'),
      'components': resolve('components'),
    };

    return config;
  }
}));
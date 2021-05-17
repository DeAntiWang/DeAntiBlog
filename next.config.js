const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: function (config) {
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
      'config': resolve('config'),
      'common': resolve('common'),
      'components': resolve('components'),
    };
    return config;
  }
};
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  // mode: "development",
  watch: true,
  entry: "./pages/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      'static': resolve('static'),
      'pages': resolve('pages'),
      'config': resolve('config'),
      'common': resolve('common'),
      'components': resolve('components'),
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.s[ac]ss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
      { test: /\.css$/, use: [ "style-loader", "css-loader"] },
      { test: /\.tsx?$/, loader: "babel-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  }
};

module.exports = {
  // mode: "development",
  watch: true,
  entry: "./pages/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
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

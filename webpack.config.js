const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  optimization: {
    minimize: false
  },
  watchOptions: {
    ignored: /node_modules|dist|\.js/g
  },
  devtool: "inline-cheap-module-source-map",
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: "worker.js"
  },
  plugins: [new Dotenv()]
};

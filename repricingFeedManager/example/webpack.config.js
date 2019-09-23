const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackUtils = require('../utils/webpack.utils');

const devPath = path.join(__dirname, '.dev');

module.exports = {
  entry: {
    'example': path.join(__dirname, 'app.ts')
  },
  output: {
    filename: '[name].js',
    path: devPath
  },
  module: {
    rules: [
      webpackUtils.rules.typescript,
      webpackUtils.rules.html,
      webpackUtils.rules.less,
      webpackUtils.rules.css,
      webpackUtils.rules.images
    ]
  },
  resolve: webpackUtils.resolve,
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new webpack.ProvidePlugin({}),
  ]
};

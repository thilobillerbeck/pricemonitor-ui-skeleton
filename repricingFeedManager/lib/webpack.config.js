const path = require('path');
const webpackUtils = require('../utils/webpack.utils');

const entry = path.join(__dirname, 'index.ts');
const distPath = path.join(__dirname, '../dist');

module.exports = {
  entry: {
    'pricemonitor.skeleton': entry
  },
  output: {
    filename: '[name].js',
    path: distPath
  },
  externals: {
    'angular': 'angular'
  },
  module: {
    rules: [
      webpackUtils.rules.typescript,
      webpackUtils.rules.html,
      webpackUtils.rules.less,
      webpackUtils.rules.images
    ]
  },
  resolve: webpackUtils.resolve
};

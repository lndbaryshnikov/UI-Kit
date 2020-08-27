const path = require('path');
const merge = require('webpack-merge');

const babel = require('./webpack/babel');
const pug = require('./webpack/pug');
const styles = require('./webpack/styles');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const devServer = require('./webpack/dev-server');
const providePlugin = require('./webpack/provide-plugin');
const favicons = require('./webpack/favicons');
const html = require('./webpack/html');
const minimizer = require('./webpack/minimizer');

const PATHS = {
  src: path.join(__dirname, 'src/pages'),
  dist: path.join(__dirname, 'dist'),
};

const common = merge([
  {
    entry: path.join(__dirname, 'src/main.js'),
    output: {
      path: PATHS.dist,
      filename: './js/[name].js',
    },
    devtool: 'source-map',
  },
  babel(),
  minimizer(),
  pug(),
  styles(),
  images(),
  fonts(),
  providePlugin(),
  html({ source: PATHS.src, index: 'ui-kit-demo' }),
  favicons(),
]);

module.exports = function (env) {
  if (env === 'production') {
    return common;
  }

  if (env === 'development') {
    return merge([
      {},
      common,
      devServer(),
    ]);
  }

  return undefined;
};

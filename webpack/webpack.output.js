const PATH = require('../config/path');

module.exports = {
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
  path: PATH.JS_DEST,
  publicPath: '/',
};

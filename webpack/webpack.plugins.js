const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const PATH = require('../config/path');

module.exports = [
  new ProgressBarPlugin(),
];

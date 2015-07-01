'use strict';

module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  output: {
    path: __dirname + '/build/',
    filename: 'build.js'
  }
};

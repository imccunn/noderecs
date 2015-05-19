'use strict';

var through = require('through2');

module.exports = function() {
  return through.obj(function(o, enc, cb) {
    this.push(JSON.stringify(o) + '\n');
    cb();
  });
};

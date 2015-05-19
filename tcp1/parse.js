'use strict';

var through = require('through2');

module.exports = function() {
  return through.obj(function(chunk, enc, cb) {
    var ret;
    try {
      ret = JSON.parse(chunk);
    } catch(err) {
      ret = {error: err.message};
    }
    this.push(ret);
    cb();
  });
};

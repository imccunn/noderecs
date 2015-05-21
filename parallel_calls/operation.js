'use strict';

module.exports = function composedCall(args, cb) {
  var pending = 0;
  var results = [];
  var calledBack = false;

  call1(args, handleResult());
  call2(args, handleResult());
  call3(args, handleResult());

  function handleResult() {
    var order = pending;
    pending++;
    return function (err, result) {
      pending--;
      if (err) {
        callback(err);
      } else {
        results[order] = result;
        if (!pending) {
          callback(null, results);
        }
      }
    };
  }

  function callback(err, value) {
    if (!calledBack) {
      calledBack = true;
      cb(err, value);
    }
  }
};

// Calls

function call1(args, cb) {
  setTimeout(cb, randomTimeout(), null, randomValue());
}

function call2(args, cb) {
  setTimeout(cb, randomTimeout(), null, randomValue());
}

function call3(args, cb) {
  setTimeout(cb, randomTimeout(), null, randomValue());
}

// Utils

function randomTimeout() {
  return Math.floor(Math.random() * 1e3);
}

function randomValue() {
  return Math.floor(Math.random() * 1e10);
}

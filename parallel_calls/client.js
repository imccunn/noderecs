'use strict';

var operation = require('./operation');

operation({some: 'args'}, function(err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log('Successful result', result);
  }
});

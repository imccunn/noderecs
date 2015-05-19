'use strict';

var net = require('net');
var args = process.argv;

var con = {
  port: args[2] || 3000,
  host: args[3] || '127.0.0.1'
};

var connection = net.createConnection(con, function() {
  console.log('Connection successful');
});

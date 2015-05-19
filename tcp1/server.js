'use strict';

var net = require('net');
var split = require('split2');
var Service = require('./service');
var server = net.createServer();

server.on('connection', function(connection) {
  console.log('Connection established.');
  
  connection.setEncoding('utf8');
  
  connection.once('close', function() {
    console.log('connection closed');
  });
  
  var service = Service();
  service.on('error', function(err) {
    console.error(err);
  });
  // or pipe back onto the connection
  connection.pipe(service).pipe(connection);
  
  //connection.on('data', function(buff){
  //  connection.write(buff.toUpperCase());
  //});
  
  //write directly back to connection explicitly
  //connection.on('data', function(buff) {
  //  process.stdout.write('data: ' + buff);
  //  connection.write(buff);
  //});
  
  // var emit = connection.emit;
  // connection.emit = function(event) {
  //   console.log('connection emitted event type %j', event);
  //   emit.apply(connection, arguments);
  // };
});

module.exports = server;


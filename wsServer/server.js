'use strict';

var http = require('http');
var connect = require('connect');
var app = connect();
var serveIndex = require('serve-index');
var WebSocketServer = require('ws').Server;
var server;
var wsServer;

// app.use(connect.static('public')); **no longer in use
server = http.createServer(app);
wsServer = new WebSocketServer({
  server: server
});

wsServer.on('connection', function(ws) {
  console.log('Connection established.');
  ws.send('you\'ve connected');
  ws.on('message', function(message, flags) {
    ws.send(message, flags);
  });
});

server.listen(3333);



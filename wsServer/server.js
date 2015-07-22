'use strict';

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(req, res) {
  console.log(new Date() + ': Recieved request for '+ req.url);
  res.writeHead(404);
  res.end();
})

var port = process.env.PORT = 3333;

server.listen(port, function() {
  console.log(new Date() + ' - Server listening on port ' + port);
});

var wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to determine if origin is allowed
  return true;
}

wsServer.on('request', function(req) {
  if (!originIsAllowed(req.origin)) {
    req.reject();
    console.log(new Date() + ': Request rejected from ' + req.origin);
    return;
  }

  var connection = req.accept('echo-protocol', req.origin);
  console.log(new Date() + ': Request accepted.');
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Recieved message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === 'binary') {
      console.log('Recieved binary message of ' + message.binaryData.length + ' bytes');
     connection.sendBytes(message.binaryDate); 
    }
  });

  connection.on('close', function(reasonCode, description) {
    console.log(new Date() + ': Peer ' + connection.remoteAddress + ' disconnected.');

  });
});

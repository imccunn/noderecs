'use strict';

var https = require('https');
var fs = require('fs');
var tls = require('tls');
var inherits = require('util').inherits;

function acquireSSL(fileLocation) {
  var data;
  try {
    data = fs.readFileSync(fileLocation); 
    return data;
  } catch(e) {
    console.log('pem not found');
    return 0;
  }
}

var options  = {
  key: acquireSSL('privatekey.pem'),
  cert: acquireSSL('certificate.pem')
};

function Server(opts, requestListener) {
  if(!(this instanceof Server)) return new Server(opts, requestListener);

  if (process.features.tls_npn && ! opts.NPNProtocols) {
    opts.NPNProtocols = ['http/1.1', 'http/1.0'];
  }

  tls.Server.call(this, opts, http._connectionListener);
  this.httpAllowHalfOpen = false;

  if (requestListener) {
    this.addListener('request', requestListener);
  }

  this.addListener('clientError', function(err, conn) {
    conn.destroy(err);
  });

  this.timeout = 2 * 60 * 1000;
}
inherits(Server, tls.Server);
  

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.write('https!\n');
  res.end();
}).listen(3000);


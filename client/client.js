'use strict';

var net = require('net');
var args = process.argv.slice(2);

var con = {
  port: args[0] || 3000,
  host: args[1] || '127.0.0.1'
};

var clientOptions = {
	host: 'localhost',
	port: con.port,
 	path: '/',
	method: 'GET'
};	

var connection = net.createConnection(con, function() {
  console.log('Connection successful');
});



var clientReq = http.request(clientOptions, function(res) {
	console.log('status code: ', res.statusCode);
	switch(res.statusCode) {
		case 200: 
						res.setEncoding('utf8');
						res.on('data', function(data) {
							console.log('data: ', data);
						});
						break;
		case 404:
						console.log('404 error');
						break;
	}
});

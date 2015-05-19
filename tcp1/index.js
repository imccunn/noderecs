'use strict';

var server = require('./server');

server.listen(3000, function(){
  console.log('Server listening on %j', server.address());
});

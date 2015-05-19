'use strict';

var fs = require('fs');

fs.readFile(__filename, {encoding: 'utf8'}, gotFileContent);

function gotFileContent(err, content) {
  if (err) {
    console.error(err);
  } else {
    console.log('This is the file content\n\n%s', content);
  }
}

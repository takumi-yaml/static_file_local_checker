'use strict';

var fs = require('fs'),
    Buffer = require('buffer').Buffer;

var bf = (new Buffer(fs.readFileSync('/etc/passwd'), 'utf8')).toString();

console.log( bf );
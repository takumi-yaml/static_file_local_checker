#!/usr/bin/env node

var fs = require('fs');

exports.isDir = function(path){
  var s = fs.statSync(path);
  return s.isDirectory();
};




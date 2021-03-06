#!/usr/bin/env node

var csslint = require('csslint'),
    fs = require('fs'),
    color = require('colors');

exports.execCssLint = function (path, callback) {
  fs.readFile(path, function (err, data) {
    if (err) throw err;
    var files = data.toString();
    var result = csslint.CSSLint.verify(files);
    if (result) {
      console.log('\n' + path + ' ========================================');
      result.messages.forEach(function (e) {
        var emColor = (/error/.test(e.type)) ? 'red' : 'yellow';
        color.setTheme({ em: emColor });
        if (e) console.log(e.type.em + ' : ' + 'L' + e.line + ' : ' + e.message);
      });
    }
    callback(null);
  });
};

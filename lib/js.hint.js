#!/usr/bin/env node

var jshint = require('jshint'),
    fs = require('fs'),
    color = require('colors');



exports.execJsHint = function (path) {

  if(/min\.js/.test(path)) return;

  fs.readFile(path, function (err, data) {
    if (err) throw err;

    var option = {
          browser: true,
          devel: true,
          debug: true
        },
        file = data.toString(),
        result = jshint.JSHINT(file, option);
    if (!result) {
      jshint.JSHINT.errors.forEach(function (e) {
        if (e) console.log("WORNING!! file: ".red + " line: " + e.line + " character: " + e.character + e.reason);
      });
    }
  });
};

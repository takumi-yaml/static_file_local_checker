#!/usr/bin/env node

var jshint = require('jshint'),
    fs = require('fs');


exports.execJsHint = function (path, callback) {

  if(/min\.js/.test(path)) return;

  fs.readFile(path, function (err, data) {
    if (err) throw err;

    console.log(path + ' ====================================================');

    var option = {
          browser: true,
          devel: true,
          debug: true
        },
        file = data.toString(),
        result = jshint.JSHINT(file, option);

    if (!result) {
      jshint.JSHINT.errors.forEach(function (e) {
        if (e) console.log("WARNING!! file: ".red + " line: " + e.line + " character: " + e.character + e.reason);
      });
    }
    callback(null);
  });
};


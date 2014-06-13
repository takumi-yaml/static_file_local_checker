#!/usr/bin/env node


var tidy = require('htmltidy').tidy,
    fs = require('fs'),
    colors = require('colors'),
    Buffer = require('buffer').Buffer,
    EventEmitter = require('events').EventEmitter,
    options = {
      outputXhtml: true,
      quiet: 1,
      indent: 1,
      showWarnings: true,
      showErrors: 6,
      charEncoding: 'raw'
    };

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

exports.execTidy = function (path, tidy_options) {
//  var ev = new EventEmitter;
//  ev.on('end', function(){ callback() });

  var html = (new Buffer(fs.readFileSync(path), 'utf8')).toString();
  if(!tidy_options) tidy_options = options;

  (function (text, filepath, opt) {
    tidy(text, tidy_options, function (err, html) {

      var name = filepath + ":";
      if (err) {
        console.log("validation error!".warn.bold + " " + name);
        console.log(err.error);
      }
      else {
        console.log('wonderful!!'.silly.bold + " " + name + "\n");
      }
      //ev.emit('end');
    });
  })(html, path, tidy_options);

};


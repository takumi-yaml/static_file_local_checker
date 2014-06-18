#!/usr/bin/env node
var path = require('path'),
    fs = require('fs'),
    readlines = require('readlines'),
    color = require('colors');

exports.cssImgCheck = function (filePath, callback) {
  var dir = path.dirname(filePath);
  var file = readlines.readlinesSync(filePath);
  var stats = getURL(file);

  for (var i in stats) {
    imgCheck(stats[i][0], stats[i][1], dir);
  }
  callback(null);
};

function getURL(text) {
  var paths = [],
      j = 0,
      re = /url\((.*)\)/;
  for (var i in text) {
    if (re.test(text[i])) {
      var tempArray = re.exec(text[i]);
      paths[j] = [i, tempArray[1]];
    }
    j++;
  }
  return paths;
}

function imgCheck(lineNum, filePath, dir) {
  fs.open(dir + '/' + filePath, 'r', function (err, fd) {
    if (err) console.log(
            'L' + lineNum + ' : ' + filePath + ' is NOT EXIST'.red
    );
  })
}


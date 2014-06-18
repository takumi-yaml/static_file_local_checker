#!/usr/bin/env node


var jquery = require('jquery'),
    jsdom = require('jsdom'),
    fs = require('fs'),
    imagesize = require('imagesize'),
    path = require('path');


var red     = '\u001b[31m';
var reset   = '\u001b[0m';

exports.sizeCheck = function(filePath, callback) {
  fs.readFile(filePath, function (error, data) {
    if (error) throw error;
    var html = data.toString();
    jsdom.env(html, function (error, window) {
      if (error) throw error;
      var $ = jquery(window);
      var imgStat = [];
      $('img').each(function (i) {
        imgStat[i] = {
          'width': $(this).attr('width'),
          'height': $(this).attr('height'),
          'src': $(this).attr('src'),
          'alt': $(this).attr('alt')
        }
      });
      imgDef(filePath, imgStat);
      callback(null);
    });
  });
}

function imgDef(filePath, arr) {

  for (var i = 0; i < arr.length; i++) {

    if(/http:\/\//.test( arr[i].src )) return; // 外部からもってくる画像はチェックしない。

    var imgPath = path.dirname(filePath) + '/' + arr[i].src,
        stream = fs.createReadStream(imgPath),
        imgSize = arr[i].width + 'x' + arr[i].height;

    (function(imgSize, imgPath){
      imagesize(stream, function (err, result) {
        if (err) throw err;
        var naturalSize = result.width + 'x' + result.height;
        if (naturalSize !== imgSize) {
          console.log( ' >> ' + path.basename(imgPath) + ' : ' + naturalSize + ' | ' +  red + imgSize + reset);
        }
      });
    })(imgSize, imgPath);

  }
}

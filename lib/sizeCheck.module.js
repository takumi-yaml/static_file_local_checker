/**
 * Created by tkm_ymmt_rebelt on 2014/06/06.
 */


var jquery = require('jquery'),
    jsdom = require('jsdom'),
    fs = require('fs'),
    imagesize = require('imagesize'),
    path = require('path');


var red     = '\u001b[31m';
var reset   = '\u001b[0m';

exports.sizeCheck = function(filePath) {
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
    });
  });
}

function imgDef(filePath, arr) {
  console.log(filePath);
  for (var i = 0; i < arr.length; i++) {
    var imgPath = path.dirname(filePath) + '/' + arr[i].src,
    stream = fs.createReadStream(imgPath),
        imgSize = arr[i].width + 'x' + arr[i].height;

    //ToDo: Še€–Ú•‚ð‘µ‚¦‚é
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

/**
 * Created by tkm_ymmt_rebelt on 2014/06/06.
 */

var _path = require('path'),
    fs = require('fs'),
    color = require('colors');

exports.cssImgCheck = function(filePath){

  fs.readFile(filePath, function(err, data){
    if(err) throw err;
    var file = data.toString();
    var imgPath = '';
    var lineNum;

    imgCheck(imgPath, lineNum);
  });
};


function getURL(text){
  var u = '';




  return u;
};


function imgCheck(filePath, lineNum) {
  fs.open(filePath, 'r', function(err, fd){
    if(err) console.log(
        'L' + lineNum + ' : ' + filePath + 'is NOT EXIST'
    );
  })
}

/*
* 1. CSSファイルの中の URL の記述をチェック
* 2. パスをひろう。
* 3. 画像をとりにいく。 okならok なかったら errorの行となかった画像名を表示
* */


/*
*
* テキストから任意の文字列とその行番号を取得したい。
*
* */
#!/usr/bin/env node

var async = require('async'),
    ci = require('lib/cssImgCheck.js'),
    cm = require('lib/css.lint.js'),
    gm = require('lib/glob.js'),
    tm = require('lib/tidy.js'),
    jm = require('lib/js.hint.js'),
    sc = require('lib/sizeCheck.js');



/* tidy */
function td_locals(dir){
  var tempArr = gm.returnFiles('html', dir);
  console.log('this is tidy');
  for(var i in tempArr){
    tm.execTidy( tempArr[i]);
  }

}

/* 画像のサイズチェック */
function sc_locals (dir){
  var tempArr = gm.returnFiles('html', dir);
  console.log('this is sizeCheck');
  for(var i in tempArr){
    sc.sizeCheck(tempArr[i]);
  }
}

/* jsHint */
function jh_locals (dir){
  var tempArr = gm.returnFiles('js', dir);
  console.log('this is jsHint');
  for(var i in tempArr){
    jm.execJsHint(tempArr[i]);
  }
}

/* CSSLint */
function cl_locals (dir){
  var tempArr = gm.returnFiles('css', dir);
  console.log('this is cssLint');
  for(var i in tempArr){
    cm.execCssLint(tempArr[i]);
  }
}

/* css上の画像を探すスクリプト */
function ci_locals (dir){
  var tempArr = gm.returnFiles('css', dir);
  console.log('this is cssImageCheck');
  for(var i in tempArr){
    ci.cssImgCheck(tempArr[i]);
  }
}

function callback() {
  console.log('end');
}

exports.run = function (dir) {
  td_locals(dir, callback);
  sc_locals(dir, callback);
  jh_locals(dir, callback);
  cl_locals(dir, callback);
  ci_locals(dir, callback);
  //ToDo: 順番にさせたい。
};
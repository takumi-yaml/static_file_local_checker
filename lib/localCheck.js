#!/usr/bin/env node

var cm = require('lib/css.lint.js'),
    gm = require('lib/glob.js'),
    tm = require('lib/tidy.js'),
    jm = require('lib/js.hint.js'),
    sc = require('lib/sizeCheck.js');


/* tidy */
exports.td_locals = function(dir){
  var tempArr = gm.returnFiles('html', dir);
  for(var i in tempArr){
    tm.execTidy( tempArr[i]);
  }
}

/* 画像のサイズチェック */
exports.sc_locals = function(dir){
  var tempArr = gm.returnFiles('html', dir);
  for(var i in tempArr){
    sc.sizeCheck(tempArr[i]);
  }
}

/* jsHint */
exports.jh_locals = function(dir){
  var tempArr = gm.returnFiles('js', dir);
  for(var i in tempArr){
    jm.execJsHint(tempArr[i]);
  }
}

/* CSSLint */
exports.cl_locals = function(dir){
  var tempArr = gm.returnFiles('css', dir);
  for(var i in tempArr){
    cm.execCssLint(tempArr[i]);
  }
}

exports.run = function(dir){
  //ToDo: 順番にさせたい。
//  this.td_locals(dir);
//  this.sc_locals(dir);
//  this.jh_locals(dir);
  this.cl_locals(dir);
};
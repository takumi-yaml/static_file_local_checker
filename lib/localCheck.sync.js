#!/usr/bin/env node

var async = require('async'),
    path = require('path'),
    id = require('./isdir.js'),
    fs = require('fs'),
    ci = require('./cssImgCheck.js'),
    cm = require('./css.lint.js'),
    gm = require('./glob.js'),
    tm = require('./tidy.sync.js'),
    jm = require('./js.hint.js'),
    sc = require('./sizeCheck.js');

/* tidy */
function td_locals(filepath, callback) {
  var opt = {
    outputXhtml: true,
    quiet: 1,
    indent: 1,
    showWarnings: true,
    showErrors: 6,
    charEncoding: 'raw'
  };
if (id.isDir(filepath)) {

    var tempArr = gm.returnFiles('html', filepath);
    if(tempArr.length === 0) callback(null);
    tempArr.forEach(function(file, i){
      console.log('tidy: ' + file);
      if(tempArr.length === i+1){
        tm.execTidy(file, opt, callback);
      } else {
        tm.execTidy(file, opt, function(){});
      }
    });

  } else {
    console.log('tidy: ' + filepath);
    tm.execTidy(filepath, opt, callback);
  }
}

/* 画像のサイズチェック */
function sc_locals(filepath, callback) {
  if (id.isDir(filepath)) {
    var tempArr = gm.returnFiles('html', filepath);
    if(tempArr.length === 0) callback(null);
    for (var i in tempArr) {
      console.log('sizecheck: ' + tempArr[i]);
      sc.sizeCheck(tempArr[i], callback);
    }
  } else {
    console.log('sizecheck: ' + filepath);
    sc.sizeCheck(filepath, callback);
  }
}

/* jsHint */
function jh_locals(filepath, callback) {
  if (id.isDir(filepath)) {
    var tempArr = gm.returnFiles('js', filepath);
    if(tempArr.length === 0) callback(null);
    for (var i in tempArr) {
      console.log('jshint: ' + tempArr[i]);
      jm.execJsHint(tempArr[i], callback);
    }
  } else {
    console.log('jshint: ' + filepath);
    jm.execJsHint(filepath, callback);
  }
}

/* CSSLint */
function cl_locals(filepath, callback) {
  if (id.isDir(filepath)) {
    var tempArr = gm.returnFiles('css', filepath);
    if(tempArr.length === 0) callback(null);
    for (var i in tempArr) {
      console.log('csslint: ' + tempArr[i]);
      cm.execCssLint(tempArr[i], callback);
    }
  } else {
    console.log('csslint: ' + filepath);
    cm.execCssLint(filepath, callback);
  }
}

/* css上の画像を探すスクリプト */
function ci_locals(filepath, callback) {
  if (id.isDir(filepath)) {
    var tempArr = gm.returnFiles('css', filepath);
    if(tempArr.length === 0) callback(null);
    for (var i in tempArr) {
      console.log('cssImageCheck: ' + tempArr[i]);
      ci.cssImgCheck(tempArr[i], callback);
    }
  } else {
    console.log('cssImageCheck: ' + filepath);
    ci.cssImgCheck(filepath, callback);
  }
}

function callbackHandler(err, results){
  if(err) throw err;
  console.log('done');
}

exports.run = function (filepath) {
  switch (path.extname(filepath)) {
    case '.html':
      async.series([
        function(callback){
          td_locals(filepath, callback);
        },
        function(callback){
          sc_locals(filepath, callback);
        }
      ], callbackHandler);
      break;
    case '.css':
      async.series([
        function(callback){
          cl_locals(filepath, callback);
        },
        function(callback){
          ci_locals(filepath, callback);
        }
      ], callbackHandler);
      break;
    case '.js':
      jh_locals(filepath);
      break;
    default:
      async.series([
        function(callback){
          td_locals(filepath, callback);
        },
        function(callback){
          sc_locals(filepath, callback);
        },
        function(callback){
          cl_locals(filepath, callback);
        },
        function(callback){
          ci_locals(filepath, callback);
        },
        function(callback){
          jh_locals(filepath, callback);
        }
      ], callbackHandler);
      break;
  }
};

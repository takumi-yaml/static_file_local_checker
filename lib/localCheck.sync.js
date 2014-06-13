#!/usr/bin/env node

var sync = require('synchronize'),
    ci = require('lib/cssImgCheck.js'),
    cm = require('lib/css.lint.js'),
    gm = require('lib/glob.js'),
    tm = require('lib/tidy.sync.js'),
    jm = require('lib/js.hint.js'),
    sc = require('lib/sizeCheck.js');


/* tidy */
function td_locals(dir) {
  sync(tm, 'execTidy');
  var tempArr = gm.returnFiles('html', dir);
  console.log('this is tidy');
  sync.fiber(function () {
    for (var i in tempArr) {
      console.log(tempArr[i]);
      tm.execTidy(tempArr[i]);
    }
  });
}
/* 画像のサイズチェック */
function sc_locals(dir) {
  sync(sc, 'sizeCheck');
  var tempArr = gm.returnFiles('html', dir);
  console.log('this is sizeCheck');
  sync.fiber(function () {
    for (var i in tempArr) {
      console.log(tempArr[i]);
      sc.sizeCheck(tempArr[i]);
    }
  });
}
/* jsHint */
function jh_locals(dir) {
  sync(jm, 'execJsHint');
  var tempArr = gm.returnFiles('js', dir);
  console.log('this is jsHint');
  sync.fiber(function () {
    for (var i in tempArr) {
      jm.execJsHint(tempArr[i]);
    }
  });
}
/* CSSLint */
function cl_locals(dir) {
  sync(cm, 'execCssLint');
  var tempArr = gm.returnFiles('css', dir);
  console.log('this is cssLint');
  sync.fiber(function () {
    for (var i in tempArr) {
      cm.execCssLint(tempArr[i]);
    }
  });
}
function ci_locals(dir) {
  sync(ci, 'cssImgCheck');
  var tempArr = gm.returnFiles('css', dir);
  console.log('this is cssImageCheck');
  sync.fiber(function () {
    for (var i in tempArr) {
      ci.cssImgCheck(tempArr[i]);
    }
  });
}


/* css上の画像を探すスクリプト */
exports.run = function (dir) {
  td_locals(dir);
//  sc_locals(dir);
//  jh_locals(dir);
//  cl_locals(dir);
//  ci_locals(dir);
};




  //td_locals(dir);
  //sc_locals(dir);
//  jh_locals(dir);
//  cl_locals(dir);
  //ci_locals(dir);
  //ToDo: 順番にさせたい。


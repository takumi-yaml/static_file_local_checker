/**
 * Created by tkm_ymmt_rebelt on 2014/06/06.
 */

var gm = require('lib/glob.module.js'),
    tm = require('lib/tidy.module.js'),
    sc = require('lib/sizeCheck.module.js');


exports.td_locals = function(dir){
  var tempArr = gm.returnFiles('html', dir);
  for(var i in tempArr){
    tm.execTidy( tempArr[i]);
  }
};

exports.sc_locals = function(dir){
  var tempArr = gm.returnFiles('html', dir);
  for(var i in tempArr){
    sc.sizeCheck(tempArr[i]);
  }
};
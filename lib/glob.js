#!/usr/bin/env node

var glob = require('glob');
var opts = {};
exports.returnFiles = function (extention, dir, options) {
  if (!options) options = opts;

  //ToDo: dirの最後の / をつけてもつけなくても動くようにする
  var fileExtention = dir + '/' + '**/*.'  + extention;
  return glob.sync(fileExtention, options);
};
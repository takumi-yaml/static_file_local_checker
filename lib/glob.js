#!/usr/bin/env node

var glob = require('glob');
var opts = {};
exports.returnFiles = function (extention, dir, options) {
  if (!options) options = opts;

  //ToDo: dir�̍Ō�� / �����Ă����Ȃ��Ă������悤�ɂ���
  var fileExtention = dir + '/' + '**/*.'  + extention;
  return glob.sync(fileExtention, options);
};
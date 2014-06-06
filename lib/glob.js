#!/usr/bin/env node

var glob = require('glob');
var opts = {};
exports.returnFiles = function (extention, dir, options) {
  if (!options) options = opts;

  //ToDo: dir‚ÌÅŒã‚Ì / ‚ğ‚Â‚¯‚Ä‚à‚Â‚¯‚È‚­‚Ä‚à“®‚­‚æ‚¤‚É‚·‚é
  var fileExtention = dir + '/' + '**/*.'  + extention;
  return glob.sync(fileExtention, options);
};
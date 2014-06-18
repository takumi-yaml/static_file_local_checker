#!/usr/bin/env node

var fs = require('fs'),
    p = '/Users/tkm_ymmt_rebelt/www/flets-w/u-next/index.html';

fs.stat(p, function(err,stats){
  if(err) throw err;

  console.log(stats.isDirectory());

});
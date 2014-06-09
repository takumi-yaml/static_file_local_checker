#!/usr/bin/env node

/*
* �S�Ẵt�@�C���ꗗ���쐬����B
* �S�Ẵe�L�X�g�t�@�C����ǂݍ��݁A�p�X�𒊏o
* ���ꂼ��̃p�X�ւ̃p�X�ւ̃����N�����邩����B
* �����N���Ȃ��t�@�C���𒊏o
*
* */


var fs = require('fs');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};


walk('/Users/tkm_ymmt_rebelt/zojirushi_exp/htdocs/syohin/netchu', function(err, results){
   if(err) throw err;
  console.log(results);
});


//var fs = require('fs'),
//    path = require('path');
//
//
//function searchInDir(dir){
//  var tempArray = [];
//  var directories = [];
//  fs.readdirSync(dir).forEach(search(item));
//
//
//  function search(item) {
//    var stat = fs.statSync(path.join(dir, item));
//    if(stat.isDirectory()) directories.push(path.join(dir, item));
//    for(var i in directories){
//      fs.readdirSync(directories).forEach(search(item));
//    };
//  }



//    if(err) throw err;
//    fs.fstat(files, function(){ return path.join(dir, files)} );
//    console.log(fd);
//    if (stat.isFile()) { tempArray[i] = path.join(dir, files);}
//    else if (stat.isDirectory()) search(files);
//    return tempArray;
//  });
//  console.log(tempArray);
//}

//searchInDir('/Users/tkm_ymmt_rebelt/zojirushi_exp/htdocs/syohin/netchu');
//this.linkCheck('/Users/tkm_ymmt_rebelt/zojirushi_exp/htdocs/syohin/netchu/');


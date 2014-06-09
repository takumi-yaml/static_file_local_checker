#!/usr/bin/env node

/*
* 全てのファイル一覧を作成する。
* 全てのテキストファイルを読み込み、パスを抽出
* それぞれのパスへのパスへのリンクがあるか判定。
* リンクがないファイルを抽出
*
* */


var fs = require('fs'),
    readlines = require('readlines'),
    p = '/Users/tkm_ymmt_rebelt/zojirushi_exp/htdocs/syohin/netchu';


exports.linkCheck = function(dir){
  walk(dir, function(err, results){
    if(err) throw err;
    var files = getFiles(results);

    var paths = [];
    for(var i in files){
      paths[i] = getURL(files[i]);
    }

    console.log(paths);
  });
}

function walk (dir, done) {
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

function getFiles(filePaths){

  var tempArray = [];
  filePaths.forEach(function(filePath){
    if(/\.css/.test(filePath)){
        tempArray.push(filePath);
    }
  });

  return tempArray;
}

function getURL(filePath) {
  var lines = readlines.readlinesSync(filePath),
      paths = [],
      j = 0,
      re = /url\((.*)\)|href =\"(.*)\"/;

  for (var i in lines) {
    if (re.test(lines[i])) {
      var tempArray = re.exec(lines[i]);
      paths[j] = [i, tempArray[1]];
      j++;
    }
  }
  return paths;
}


this.linkCheck(p);


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



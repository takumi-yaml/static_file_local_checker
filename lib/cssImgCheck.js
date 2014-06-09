#!/usr/bin/env node

var path = require('path'),
    fs = require('fs'),
    readlines = require('readlines');
    color = require('colors');

exports.cssImgCheck = function(filePath){
  var dir = path.dirname(filePath);
  var file = readlines.readlinesSync(filePath);
  var stats = getURL(file);

  for(var i in stats){
    imgCheck(stats[i][0], stats[i][1], dir);
  }

};


function getURL(text){
  var paths = [],
      j = 0,
      re = /url\((.*)\)/;

  for(i in text){
    if(re.test(text[i])){
      var tempArray = re.exec(text[i]);
      paths[j] = [i, tempArray[1]];
    }
    j++;
  }

  return paths;

}


function imgCheck(lineNum, filePath, dir) {
  fs.open(dir + '/' + filePath, 'r', function(err, fd){
    if(err) console.log(
        'L' + lineNum + ' : ' + filePath + ' is NOT EXIST'.red
    );
  })
}


this.cssImgCheck('/Users/tkm_ymmt_rebelt/zojirushi_exp/htdocs/syohin/netchu/css/netchu.css');

/*
* 1. CSS�t�@�C���̒��� URL �̋L�q���`�F�b�Ng
* 2. �p�X���Ђ낤�B
* 3. �摜���Ƃ�ɂ����B ok�Ȃ�ok �Ȃ������� error�̍s�ƂȂ������摜����\��
* */


/*
*
* css�t�@�C������C�ӂ̕�����Ƃ��̍s�ԍ����擾�������B
*
* */
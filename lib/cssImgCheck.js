/**
 * Created by tkm_ymmt_rebelt on 2014/06/06.
 */

var _path = require('path'),
    fs = require('fs'),
    color = require('colors');

exports.cssImgCheck = function(filePath){

  fs.readFile(filePath, function(err, data){
    if(err) throw err;
    var file = data.toString();
    var imgPath = '';
    var lineNum;

    imgCheck(imgPath, lineNum);
  });
};


function getURL(text){
  var u = '';




  return u;
};


function imgCheck(filePath, lineNum) {
  fs.open(filePath, 'r', function(err, fd){
    if(err) console.log(
        'L' + lineNum + ' : ' + filePath + 'is NOT EXIST'
    );
  })
}

/*
* 1. CSS�t�@�C���̒��� URL �̋L�q���`�F�b�N
* 2. �p�X���Ђ낤�B
* 3. �摜���Ƃ�ɂ����B ok�Ȃ�ok �Ȃ������� error�̍s�ƂȂ������摜����\��
* */


/*
*
* �e�L�X�g����C�ӂ̕�����Ƃ��̍s�ԍ����擾�������B
*
* */
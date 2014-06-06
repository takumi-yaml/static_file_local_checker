/**
 * Created by kodkod on 2014/06/06.
 */

var gm = require('./glob.module.js'),
    paths = [
        '**/*.js',
        '**/*.txt'
    ],
    files = [];



function allFiles(){
  for(var i in paths){
    files[i] = gm.returnFiles(paths[i]);
    console.log(i + ' : ' + files[i] + ', ');
  }
}

allFiles();

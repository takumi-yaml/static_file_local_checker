/**
 * Created by tkm_ymmt_rebelt on 2014/06/06.
 */

var csslint = require('csslint'),
    fs = require('fs'),
    color = require('colors');

//ToDo: オプションを設定してwarningをまびく。

exports.execCssLint = function (path) {
  fs.readFile(path, function (err, data) {
    if (err) throw err;
    var files = data.toString();
    var result = csslint.CSSLint.verify(files);
    if (result) {
      console.log('\n' + path + ' ========================================');
      result.messages.forEach(function (e) {
        var emColor = (/error/.test(e.type)) ? 'red' : 'yellow';
        color.setTheme({ em: emColor });
        if (e) console.log(e.type.em + ' : ' + 'L' + e.line + ' : ' + e.message);
      });
    }
  });
};

this.execCssLint('/Users/tkm_ymmt_rebelt/www/flets-w/hikaritv/css/hikaritv.css');
/**
 * Created by tkm_ymmt_rebelt on 2014/06/05.
 */

var tidy = require('htmltidy').tidy,
    fs = require('fs'),
    iconv = require('iconv'),
    conv = new iconv.Iconv('SHIFT_JIS','UTF-8');

    thisPath = '/Users/tkm_ymmt_rebelt/zojirushi_exp/htdocs/syohin/netchu/salt2014/index.html';

var colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});


fs.readFile(thisPath, function (error, data) {
  if (error) throw error;
  var html = conv.convert(data.toString()).toString();


  tidy_exec(html, thisPath);

});

var tidy_options = {
  outputXhtml: true,
  quiet: 1,
  indent: 1,
//  inputEncoding: 'shiftjis',
//  outputEncoding: 'shiftjis',
  showWarnings: true,
  showErrors: 6,
  charEncoding: 'raw'
};

function tidy_exec(text, filepath) {

  tidy(text, tidy_options, function(err, html) {

    console.log(html);
    var name = filepath + ":";
    if (err) {
      console.log("validation error!".warn.bold + " " + name);
      console.log(err.error);
    }
    else {
      console.log('wonderful!!'.silly.bold + " " + name +"\n");
    }
  });
}
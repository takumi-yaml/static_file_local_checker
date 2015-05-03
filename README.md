# localchecker
ローカル環境にあるhtml,css,jsをチェックする  
要 node.js v0.10.x

html : tidy でのvalidate。 画像のサイズチェック。  
css : csslint での validate。 画像のパスが合ってるかチェック。  
js : jshintでのvalidate  


check local files.

## Installation


## Usage
```
$ node index.js FILEPATH
```

## 今後の予定
ディレクトリを引数に指定した際にそこにあるファイルを全部チェックするようにする。

## Credits
[takumi.y](https://github.com/tkm-ymmt/)

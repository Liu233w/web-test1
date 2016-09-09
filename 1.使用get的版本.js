var express = require("express");
var fs = require("fs");
var url = require("url");

var index_head = ' <html> <head> <meta charset="utf-8"/> <title>这是一个主页</title> </head> <body> <h1>请选择要查看的文件</h1> <form method="get" action="/txt/"> ';
var index_tail = ' <li><input type="submit" value="Submit"></li> </form> </body> </html> '

function formatIndex() {
    var lst = "";
    var files = fs.readdirSync(__dirname + '/txt/');
    for (i in files) {
        lst += '<li><input type="radio" name="files" value="' + files[i];
        lst += '">' + files[i] + '</li>';
    }
    return index_head + lst + index_tail;
}

var out_head = ' <html> <head> <meta charset="utf-8"/> <title>某一个文件</title> </head> <body> ';
var out_tail = ' <br /> <a href="/">回主页</a> </body> </html> '

function formatTxt(name) {
    var file = fs.readFileSync(__dirname + '/txt/' + name, 'utf-8');
    return out_head + file + out_tail;
}

var app = express();

app.get('/', function(req, res) {
    res.send(formatIndex());
});
app.get('/txt/', function(req, res) {
    var ul = url.parse(req.url,true);
    res.send(formatTxt(ul.query['files']));
})

console.log("服务器于127.0.0.1:8888开启");
var server = app.listen(8888);

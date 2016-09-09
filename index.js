var express = require("express");
var fs = require("fs");
var url = require("url");
var bodyParser = require("body-parser");

var index_head = ' <html> <head> <meta charset="utf-8"/> <title>这是一个主页</title> </head> <body> <h1>请选择要查看的文件</h1> <form method="post" action="/txt"> ';
var index_tail = ' <li><input type="submit" value="Submit"></li> </form> </body> </html> '

function formatIndex(req,res) {
    fs.readdir(__dirname + '/txt/',function(err, files){
        if(err)
            throw err;
        var lst = "";
        for (i in files) {
            lst += '<li><input type="radio" name="files" value="' + files[i];
            lst += '">' + files[i] + '</li>';
        }
        res.send(index_head + lst + index_tail);
    });
}

var out_head = ' <html> <head> <meta charset="utf-8"/> <title>某一个文件</title> </head> <body> ';
var out_tail = ' <br /> <a href="/">回主页</a> </body> </html> '

function formatTxt(req,res) {
    var fileName=req.body['files'];
    fs.readFile(__dirname + '/txt/' + fileName, 'utf-8',function(err, file){
        if(err)
            throw err;
        res.send(out_head + file + out_tail);
    });
}

function noPage(req,res){
    res.send("404");
}

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', formatIndex);
app.post('/txt', formatTxt);
// app.get('/txt',noPage);
// app.get('/*',noPage);

var server = app.listen(8888,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务器开启于http://%s:%s', host, port);
});

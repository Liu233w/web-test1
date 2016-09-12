var express = require("express");
var fs = require("fs");
var url = require("url");
var bodyParser = require("body-parser");

function formatIndex(req, res) {
    fs.readdir(__dirname + '/txt/', function(err, files) {
        if (err)
            throw err;
        res.render('index', {
            fileList: files,
        });
    });
}

function formatTxt(req, res) {
    var fileName = req.body['files'];
    fs.readFile(__dirname + '/txt/' + fileName, 'utf-8', function(err, file) {
        if (err)
            throw err;
        res.render('file-format', {
            fileName: fileName,
            file: file,
        });
    });
}

function noPage(req, res) {
    res.send("404");
}

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'pug');

app.get('/', formatIndex);
app.post('/txt', formatTxt);
app.get('/txt', noPage);
app.get('/*', noPage);

var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务器开启于http://%s:%s', host, port);
});

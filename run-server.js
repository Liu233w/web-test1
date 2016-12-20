var app = require("./index");

var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务器开启于http://%s:%s', host, port);
});

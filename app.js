var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var users = require('./routes/user.js');
var serveStatic = require('serve-static');
var methodOverride = require('method-override');
var session = require('express-session');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(connect) {
    console.log(connect);
});

server.listen(1300);
// app.listen(8808);

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(methodOverride());
app.use(cookieParser('sctalk admin manager'));
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(serveStatic(path.join(__dirname, "public")));

app.get('/test', function(req, res) {
    res.send("success");
});

app.use(function(req, res, next) {
	var err = new Error('Not Found')
	res.json({
		err: true,
		msg: "服务器出错404",
		result: null
	})
});

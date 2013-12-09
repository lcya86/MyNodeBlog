/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var SessionStore = require("session-mongoose")(express);
var app = express();





//session store
var store = new SessionStore({
	url: "mongodb://localhost/session",
	interval: 120000
})

// all environments
app.set('port', process.env.PORT || 80);
app.engine('.html', ejs.__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({
	secret: 'fens.me'
}));
app.use(express.session({
	secret: 'fens.me',
	store: store,
	cookie: {
		maxAge: 900000
	}
}));
app.use(function(req, res, next) {
	res.locals.user = req.session.user;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = '';
	if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//authentication&notAuthentication
function authentication(req,res,next){
	if(!req.session.user){
		req.session.error='请先登陆';
		return res.redirect('/login');
	}
	next();
}

function notAuthentication(req,res,next){
	if(req.session.user){
		req.session.error='已登陆';
		return res.redirect('/');
	}
	next();
}

app.get('/', routes.index);
app.get('/getpost/:title', routes.getPost);
app.all('/login',notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout',authentication);
app.get('/logout', routes.logout);
app.get('/home',authentication);
app.get('/home', routes.home);
app.get('/post',authentication);
app.get('/post', routes.post);
app.post('/post',authentication);
app.post('/post', routes.doPost);
app.get('/edit/:title',authentication);
app.get('/edit/:title',routes.edit);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

exports.io = require('socket.io').listen(server);


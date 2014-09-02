/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
http.globalAgent.maxSockets = 50;
var path = require('path');
var ejs = require('ejs');
var SessionStore = require("session-mongoose")(express);
var app = express();
var xmlBodyParser = require('./middleware/xmlBodyParser');





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
app.use(express.bodyParser(),{keepExtensions: true, uploadDir: '/public/upload'});
app.use(xmlBodyParser.xmlBodyParser);
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
function authentication(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登陆';
        return res.redirect('/login');
    }
    next();
}

function notAuthentication(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登陆';
        return res.redirect('/');
    }
    next();
}

app.get('/', routes.Home.index);
app.post('/', routes.Weixin.index);
app.get('/project/doing', routes.Project.doing);
app.get('/project/dontTouchWhite', routes.Project.dontTouchWhite);
app.get('/project/articlesClassify', routes.Project.articlesClassify);
app.get('/project/psychological/console', routes.Project.psychologicalExperiment);
app.get('/project/psychological/experiment', routes.Project.doExperiment);
app.post('/project/psychological/uploadImg', routes.Project.uploadImg);
app.post('/project/psychological/delimg', routes.Project.delImg);
app.get('/project/stock', routes.Project.stock);
app.get('/getpost/:id', routes.Post.getPost);
app.get('/like/:id', routes.Post.doLike);
app.all('/login', notAuthentication);
app.get('/login', routes.Login.login);
app.post('/login', routes.Login.doLogin);
app.get('/logout', authentication);
app.get('/logout', routes.Login.logout);
app.get('/home', authentication);
app.get('/home', routes.Home.home);
app.get('/post', authentication);
app.get('/post', routes.Post.post);
app.post('/post', authentication);
app.post('/post', routes.Post.doPost);
app.get('/edit/:id', authentication);
app.get('/edit/:id', routes.Post.edit);
app.post('/edit/:id', authentication);
app.post('/edit/:id', routes.Post.doEdit);
app.get('/remove/:id', authentication);
app.get('/remove/:id', routes.Post.doRemove);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
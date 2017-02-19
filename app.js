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
app.use(express.compress());
app.use(express.bodyParser(), {
  keepExtensions: true,
  uploadDir: '/public/upload'
});
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
  console.log(req.cookies)
  if (!req.session.user) {
    req.session.error = '请先登陆';
    console.log('请先登陆');
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
app.get('/project/painter', routes.Project.painter);
app.get('/project/painter/:timestamp', routes.Project.painter);
app.post('/project/painter/:timestamp', routes.Project.saveImage);
app.get('/project/articlesClassify', routes.Project.articlesClassify);

app.get('/project/psychological/v2/console', routes.Psycho.console);

app.get('/project/psychological/v2/CBM-A', routes.Psycho.doImageExperiment);
app.get('/project/psychological/v2/CBM-I', routes.Psycho.doTextExperiment);
app.get('/project/psychological/v2/MIX', routes.Psycho.doMixExperiment);
app.get('/project/psychological/v2/RCC', routes.Psycho.doControlExperiment);


app.get('/project/psychological/v2/CBM-A1', routes.Psycho.doImageTest1);
app.get('/project/psychological/v2/CBM-A3', routes.Psycho.doImageTest2);

app.get('/project/psychological/v2/CBM-I1', routes.Psycho.doTextTest1);
app.get('/project/psychological/v2/CBM-I3', routes.Psycho.doTextTest2);

app.get('/project/psychological/v2/First', routes.Psycho.doFirst);
app.get('/project/psychological/v2/Second', routes.Psycho.doSecond);
app.get('/project/psychological/v2/Third', routes.Psycho.doThird);
app.get('/project/psychological/v2/Fourth', routes.Psycho.doFourth);
app.get('/project/psychological/v2/Fifth', routes.Psycho.doFifth);
app.get('/project/psychological/v2/Sixth', routes.Psycho.doSixth);
app.get('/project/psychological/v2/Seventh', routes.Psycho.doSeventh);
app.get('/project/psychological/v2/Eighth', routes.Psycho.doEighth);

app.get('/project/psychological/v2/FirstC', routes.Psycho.doFirstC);
app.get('/project/psychological/v2/SecondC', routes.Psycho.doSecondC);
app.get('/project/psychological/v2/ThirdC', routes.Psycho.doThirdC);
app.get('/project/psychological/v2/FourthC', routes.Psycho.doFourthC);
app.get('/project/psychological/v2/FifthC', routes.Psycho.doFifthC);
app.get('/project/psychological/v2/SixthC', routes.Psycho.doSixthC);
app.get('/project/psychological/v2/SeventhC', routes.Psycho.doSeventhC);
app.get('/project/psychological/v2/EighthC', routes.Psycho.doEighthC);

app.get('/project/psychological/v2/AIM1', routes.Psycho.doAIM1);
app.get('/project/psychological/v2/AIM2', routes.Psycho.doAIM2);
app.get('/project/psychological/v2/RCC1', routes.Psycho.doRCC1);
app.get('/project/psychological/v2/RCC2', routes.Psycho.doRCC2);

app.get('/project/psychological/v2/console/getsubjects', routes.Psycho.getSubjects);
app.delete('/project/psychological/v2/subjects/:id', routes.Psycho.deleteSubject);
app.post('/project/psychological/v2/addpairs', routes.Psycho.addPairs);
app.get('/project/psychological/v2/getpairs', routes.Psycho.getPairs);
app.delete('/project/psychological/v2/pairs/:id', routes.Psycho.deletePair);
app.post('/project/psychological/v2/uploadImg', routes.Psycho.uploadImg);
app.post('/project/psychological/v2/console/delimg', routes.Psycho.delImg);
app.post('/project/psychological/v2/console/addsubject', routes.Psycho.addSubject);
app.post('/project/psychological/v2/console/addtext', routes.Psycho.addText);
app.get('/project/psychological/v2/console/getSentences', routes.Psycho.getSentences);
app.delete('/project/psychological/v2/sentences/:id', routes.Psycho.deleteSentence);
app.post('/project/psychological/v2/experiment/sendresult', routes.Psycho.sendResult);
app.post('/project/psychological/v2/experiment/sendtextresult', routes.Psycho.sendTextResult);
app.get('/project/psychological/v2/console/getresult', routes.Psycho.getResult);
app.get('/project/psychological/v2/console/gettextresult', routes.Psycho.getTextResult);
app.post('/project/psychological/v2/experiment/login', routes.Psycho.subjectLogin);

app.get('/project/psychological/console', routes.Project.psychologicalExperiment);
app.get('/project/psychological/practice', routes.Project.doPractice);
app.get('/project/psychological/test', routes.Project.doTest);
app.get('/project/psychological/train', routes.Project.doTrain);
app.get('/project/psychological/textpractice', routes.Project.doTextPractice);
app.get('/project/psychological/texttest', routes.Project.doTextTest);
app.get('/project/psychological/texttrain', routes.Project.doTextTrain);
app.post('/project/psychological/uploadImg', routes.Project.uploadImg);
app.post('/project/psychological/console/delimg', routes.Project.delImg);
app.post('/project/psychological/console/addsubject', routes.Project.addSubject);
app.post('/project/psychological/console/addtext', routes.Project.addText);
app.post('/project/psychological/console/delsuject', routes.Project.delSubject);
app.post('/project/psychological/experiment/sendresult', routes.Project.sendResult);
app.post('/project/psychological/experiment/sendtextresult', routes.Project.sendTextResult);
app.get('/project/psychological/console/getresult', routes.Project.getResult);
app.get('/project/psychological/console/gettextresult', routes.Project.getTextResult);
app.get('/project/psychological/experiment/login', routes.Project.subjectLogin);

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

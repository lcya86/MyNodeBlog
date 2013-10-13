
/*
 * GET home page.
 */

var app = require('../app');
var model = require('../models/models');


exports.index = function(req, res){
	model.Post.find(function(err,posts){
/*		var converter = new Showdown.converter({ extensions: ['github','prettify','table'] });
		var htposts = [];
		for(i=0;i<posts.length;i++){
			htposts[i] = converter.makeHtml(posts[i].body);
		}
		console.log(htposts);
*/
		console.log(posts);
	  res.render('index', {title: 'blog',posts:posts});

	})
};

exports.login = function(req,res){
	res.render('login',{title:'用户登陆'});
}

exports.doLogin = function(req,res){
	var user = {
		username:'admin',
		password:'admin'
	}
	if(req.body.username===user.username && req.body.password===user.password){
		req.session.user=user;
		return res.redirect('/home');
	}else{
		req.session.error='用户名或密码不正确';
		return res.redirect('/login');
	}
}

exports.logout = function(req,res){
	req.session.user=null;
	res.redirect('/');
}

exports.home = function(req,res){
	var user = {
		username:'admin',
		password:'admin'
	}
	app.io.sockets.on('connection',function(socket){
		socket.emit('user',{ip:req.ip,cookies:req.cookies,body:req.body});
	});
	res.render('home',{title:'home'});
}

exports.post = function(req,res){
	res.render('post',{title:'写文章'});
}

exports.doPost = function(req,res){
	console.log('doPost')
	model.Post.create({body:req.body.write,tags:[]},function(err){
		if(err) console.error(err);
		console.log('createOk');
	});
	model.Post.find(function(err,posts){
		console.log(posts);
	})
	return res.redirect('/blog');
}
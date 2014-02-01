/*
 * GET home page.
 */

var app = require('../app');
var model = require('../models/models');

// enter index page
exports.index = function(req, res) {
	model.Visitor.findOne({
		ip: req.ip
	}, function(err, visitor) {
		if (err) {
			console.error(err);
		}
		if (visitor) {
			visitor.frequency++;
			visitor.lastVisitTime = Date.now();
			visitor.save();
		} else {
			model.Visitor.create({
				ip: req.ip,
				frequency: 1,
				lastVisitTime: Date.now()
			}, function(err) {
				if (err) console.error(err);
				console.log('create visitor Ok');
			});
		}
	});
	model.Post.find().sort('-update -like').exec(function(err, posts) {
		return res.render('index', {
			title: 'lcy.blog',
			posts: posts,
			user: req.session.user
		});
	});
};

exports.login = function(req, res) {
	res.render('login', {
		title: '用户登陆'
	});
}

exports.doLogin = function(req, res) {
	var user = {
		username: 'admin',
		password: 'admin'
	}
	if (req.body.username === user.username && req.body.password === user.password) {
		req.session.user = user;
		return res.redirect('/home');
	} else {
		req.session.error = '用户名或密码不正确';
		return res.redirect('/login');
	}
}

exports.logout = function(req, res) {
	req.session.user = null;
	return res.redirect('/');
}

exports.home = function(req, res) {
	var user = {
		username: 'admin',
		password: 'admin'
	}
	app.io.sockets.on('connection', function(socket) {
		socket.emit('user', {
			ip: req.ip,
			cookies: req.cookies,
			body: req.body
		});
	});
	model.Visitor.find(function(err, visitors) {
		if (err) {
			console.error(err);
		}
		return res.render('home', {
			title: 'home',
			visitors: visitors
		});
	});
}

exports.post = function(req, res) {
	return res.render('post', {
		title: '写文章',
		post: null
	});
}

exports.doPost = function(req, res) {
	console.log('doPost');
	var title = req.body.write.match(/^.+$/m);
	model.Post.create({
		body: req.body.write,
		title: title[0],
		tags: []
	}, function(err) {
		if (err) console.error(err);
		console.log('createOk');
	});
	return res.redirect('/');
}

exports.getPost = function(req, res) {
	var title = req.params.title;
	if (title) {
		model.Post.find({
			title: title
		}, function(err, post) {
			if (err) {
				console.error(err);
				return res.render('404', {
					title: '404'
				});
			}
			return res.render('getpost', {
				title: title,
				post: post
			});
		});
	} else {
		return res.render('404', {
			title: '404'
		});
	}
}

exports.edit = function(req, res) {
	var title = req.params.title;
	if (title) {
		model.Post.findOne({
			title: title
		}, function(err, post) {
			if (err) {
				console.error(err);
				return res.render('404', {
					title: '404'
				});
			}
			return res.render('post', {
				title: title,
				post: post
			});
		});
	} else {
		return res.render('404', {
			title: '404'
		});
	}
}

exports.doEdit = function(req, res) {
	var title = req.params.title;
	if (title) {
		model.Post.findOneAndUpdate({
			title: title
		}, {
			body: req.body.write,
			update: Date.now()
		}, function(err) {
			if (err) {
				console.error(err);
				return res.render('404', {
					title: '404'
				});
			}
			return res.redirect('/');
		});
	} else {
		return res.render('404', {
			title: '404'
		});
	}
}

exports.doRemove = function(req, res) {
	var title = req.params.title;
	if (title) {
		model.Post.findOneAndRemove({
			title: title
		}, function(err) {
			if (err) {
				console.error(err);
			}
			return res.redirect('/');
		});
	} else {
		return res.redirect('/');
	}
}

exports.doLike = function(req, res) {
	var title = req.params.title;
	if (title) {
		model.Post.findOne({
			title: title
		}, function(err, post) {
			if (err) {
				console.error(err);
			}
			if (post) {
				post.like++;
				post.save();
			}
			return res.redirect('/');
		});
	} else {
		return res.redirect('/');
	}
}
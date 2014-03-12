/*
 * GET home page.
 */

var app = require('../app');
var model = require('../models/models');
// enter index page
exports.index = function(req, res) {
	var ip = req.ip;
	var agent = req.headers['user-agent'];
	console.log(ip+" : "+agent);
	model.Visitor.findOne({
		ip: ip
	}, function(err, visitor) {
		if (err) {
			console.error(err);
		}
		if (visitor) {
			visitor.frequency++;
			visitor.lastVisitTime = Date.now();
			visitor.save();
		} else {
			require('http').get('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='+ip,function(response){
				response.setEncoding('utf-8');
				response.on('data',function(chunk){
					var ip_info = JSON.parse(chunk);
					model.Visitor.create({
						ip: ip,
						frequency: 1,
						agent:agent,
						country:ip_info.country,
						province:ip_info.province,
						city:ip_info.city,
						lastVisitTime: Date.now()
					}, function(err) {
						if (err) console.error(err);
						console.log('create visitor Ok');
					});
				});
			}).on('error',function(err){
				console.log("Got error:"+err.message);
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
	var id = req.params.id;
	if (id) {
		model.Post.find({
			_id: id
		}, function(err, post) {
			if (err) {
				console.error(err);
				return res.render('404', {
					title: '404'
				});
			}
			return res.render('getpost', {
				title: post.title,
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
	var id = req.params.id;
	if (id) {
		model.Post.findOne({
			_id: id
		}, function(err, post) {
			if (err) {
				console.error(err);
				return res.render('404', {
					title: '404'
				});
			}
			return res.render('post', {
				title: post.title,
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
	var id = req.params.id;
	if (id) {
		model.Post.findOneAndUpdate({
			_id: id
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
	var id = req.params.id;
	if (id) {
		model.Post.findOneAndRemove({
			_id: id
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
	var id = req.params.id;
	if (id) {
		model.Post.findOne({
			_id: id
		}, function(err, post) {
			if (err) {
				console.error(err);
			}
			if (post) {
				post.like++;
				post.save();
				return res.send(200);
			}
			return res.redirect('/');
		});
	} else {
		return res.redirect('/');
	}
}
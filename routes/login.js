var model = require('../models');

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
    console.log('登录成功')
    console.log(req.cookies);
    res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
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

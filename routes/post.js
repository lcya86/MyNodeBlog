var model = require('../models');

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
		var title = req.body.write.match(/^.+$/m);
		model.Post.findOneAndUpdate({
			_id: id
		}, {
			body: req.body.write,
			title: title[0],
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

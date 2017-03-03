var model = require('../models');
var weixin = require('../tools/weixin');
exports.index = function(req, res) {
	if(req.query.signature){
		if(weixin.checkSignature(req.query.signature,req.query.timestamp,req.query.nonce)){
			return res.send(req.query.echostr);
		}else{
			return res.send(404);
		}
	}else{
		var ip = req.ip;
		var agent = req.headers['user-agent'];
		console.log(ip + " : " + agent + " at " + Date());
		if (agent && !/bingbot|Baiduspider|Googlebot|YYSpider|Bot|bot|python|Python|curl|Wget/.test(agent)) {
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
					require('http').get('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=' + ip, function(response) {
						response.setEncoding('utf-8');
						response.on('data', function(chunk) {
							var ip_info = JSON.parse(chunk);
							model.Visitor.create({
								ip: ip,
								frequency: 1,
								agent: agent,
								country: ip_info.country,
								province: ip_info.province,
								city: ip_info.city,
								lastVisitTime: Date.now()
							}, function(err) {
								if (err) console.error(err);
								console.log('create visitor Ok');
							});
						});
					}).on('error', function(err) {
						console.log("Got error:" + err.message);
					});
				}
			});
		}
		model.Post.find().sort('-update -like').exec(function(err, posts) {
			return res.render('index', {
				title: '大L的博客',
				posts: posts,
				user: req.session.user
			});
		});
	}
};

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

var crypto = require('crypto');
var TOKEN = 'lcya86';
var request = require('superagent');
exports.checkSignature = function(signature,timestamp,nonce){
	var tmpArr = [TOKEN,timestamp,nonce];
	tmpArr.sort();
	var tmpStr = tmpArr.join('');
	var shasum = crypto.createHash('sha1');
	shasum.update(tmpStr);
	tmpStr = shasum.digest('hex');
	if(tmpStr == signature){
		return true;
	}else{
		return false;
	}
}

exports.login = function(fn){
	var wx_user = 'lcya86@gmail.com';
	var wx_pwd = '1225liu';
	var shasum = crypto.createHash('md5');
	shasum.update(wx_pwd);
	var wx_pwd_md5 = shasum.digest('hex');
	request
		.post('http://mp.weixin.qq.com/cgi-bin/login?lang=zh_CN')
		.set('referer','https://mp.weixin.qq.com/')
		.type('form')
		.send({
			username: wx_user,
			pwd: wx_pwd_md5,
			imgcode : '',
			f : 'json',
			register : 0
		})
		.end(function(res){
			var cookie = '';
			var token = res.text.match(new RegExp("[\?\&]token=([^\&]+)\"","i"))[1];
			for(rs in res.header['set-cookie']){
				cookie += res.header['set-cookie'][rs].replace(/Path=\/;\sSecure;\sHttpOnly/g, '');
			}
			fn(token,cookie);
		});
}

exports.sender = function(options,fn){
	var postParams = {
		mask:false,
		tofakeid:options.fakeid,
		type:1,
		content:options.msg,
		//quickreplyid:200292542,
		token:options.token,
		lang:'zh_CN',
		//random:0.7469026290345937,
		f:'json',
		ajax:1,
		t:'ajax-response'
	}
	request
		.post('http://mp.weixin.qq.com/cgi-bin/singlesend?t=ajax-response&f=json')
		.set('referer','https://mp.weixin.qq.com/')
		.type('form')
		.send(postParams)
		.set('Cookie', options.cookie)
		.end(function(res){
			fn(JSON.parse(res.text));
		});
}

exports.getFirstMsg = function(options,fn){
	var queryString = {
		t:'message/list',
		count:1,
		day:7,
		token:options.token,
		lang:'zh_CN'
	}

	request
		.get('http://mp.weixin.qq.com/cgi-bin/message?t=message/list&count=1&day=7&token='+options.token+'&lang=zh_CN')
		.set('Cookie', options.cookie)
		.end(function(err,res){
			if(err){
				console.log(err);
			}
			console.log('ok');
			fn(JSON.parse(res.text));
		});
}
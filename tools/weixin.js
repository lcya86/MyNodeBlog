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
			var token = res.text.redirect_url;
			for(rs in res.header['set-cookie']){
				cookie += rs.replace(/Path=\//g, '');
			}
			fn(cookie);
		});
}

exports.sender = function(options,fn){
	var msg = options.msg,
			fakeid = options.fakeid;
	var psotParams = {
		type: 1,
		content: msg,
		error: false,
		tofakeid : fakeid,
		ajax : 1
	}
	request
		.post('http://mp.weixin.qq.com/cgi-bin/singlesend?t=ajax-response&lang=zh_CN')
		.set('referer','https://mp.weixin.qq.com/')
		.type('form')
		.send(psotParams)
		.set('Cookie', options.cookie)
		.end(function(res){
			fn(JSON.parse(res.text));
		});
}
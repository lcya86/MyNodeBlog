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
			for(rs in res.header['set-cookie']){
				cookie += rs.replace(/Path=\//g, '');
			}
			console.log('res:'+objToString(res));
			console.log('base_resp:'+JSON.stringify(res.base_resp));
			console.log('redirect_url:'+res.redirect_url);
			fn(null,cookie);
		});
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}
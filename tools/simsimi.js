var http = require('http');
var superrequest = require('superagent');
var cookie = '';
(function getCookie(){
	var request = http.get('http://www.simsimi.com/talk.htm',function(res){
		for(rs in res.headers['set-cookie']){
			cookie += res.headers['set-cookie'][rs].replace(/\sPath=\/;\sHttpOnly/,'');
		}
		var headers = {
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,zh-TW;q=0.2',
			'Cookie':cookie,
			'Host':'www.simsimi.com',
			'Connection':'keep-alive'
			//'User-Agent':	'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0'
		}
		var options = {
			hostname:'www.simsimi.com',
			path:'/func/register',
			method:'GET',
			headers:headers
		}
		var req = http.request(options,function(res){
			var result = '';
			res.setEncoding('utf8');
			res.on('data',function(chunk){
				result += chunk;
			});
			res.on('error',function(e){
				console.log(e.message);
			});
			res.on('end',function(){
				console.log(result);
				cookie += 'simsimi_uid='+JSON.parse(result).uid+';';
				console.log(cookie);
			});
		}).on('error',function(e){
			console.error('error1:'+e.message);
			this.destroy();
		});
		req.end();
		console.log(cookie);
	}).on('error',function(e){
		console.error('error2:'+e.message);
		this.destroy();
	});
	request.end();
}());
exports.getReply = function(msg,fn){
	superrequest
		.get('http://www.simsimi.com/func/reqN?req='+msg+'&lc=ch')
		.set('Cookie',cookie)
		.end(function(err,res){
			if(err){
				return console.error(err);
			}
			console.log(res.text);
			fn(JSON.parse(res.text).sentence_resp);
		});
}


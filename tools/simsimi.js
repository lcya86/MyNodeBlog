var http = require('http');
exports.getReply = function(msg,fn){
	http.get('http://www.simsimi.com/talk.htm',function(res){
		var cookie = '';
		for(rs in res.headers['set-cookie']){
			cookie += res.headers['set-cookie'][rs].replace(/\sPath=\/;\sHttpOnly/,'');
		}
		console.log(cookie);
		var headers = {
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,zh-TW;q=0.2',
			'Cookie':cookie+'simsimi_uid=56208236;',
			'Host':'www.simsimi.com',
			'Referer': 'http://www.simsimi.com/talk.htm',
			'User-Agent':	'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0'
		}
		var options = {
			hostname:'www.simsimi.com',
			path:'/func/reqN?req='+msg+'&lc=ch',
			headers:headers
		}
		http.get(options,function(res){
			var result = '';
			res.setEncoding('utf8');
			res.on('data',function(chunk){
				result += chunk;
			});
			res.on('error',function(e){
				console.log(e.message);
			});
			res.on('end',function(){
				fn(JSON.parse(result).sentence_resp);
			});
		}).on('error',function(e){
			console.log('error1:'+e.message);
		}).setTimeout(3000,function(){
			this.end();
		});
	}).on('error',function(e){
		console.log('error2:'+e.message);
	});
}

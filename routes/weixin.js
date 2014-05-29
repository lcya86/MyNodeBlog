var weixin = require('../tools/weixin');
var XMLWriter = require('xml-writer');
var chatList = [];
var waitList = {};
exports.index = function(req, res) {
	if (weixin.checkSignature(req.query.signature, req.query.timestamp, req.query.nonce)) {
		console.log(req.body);
		route(req,res);
	} else {
		return res.send(404);
	}
}

function route(req,res){
	var xml = req.body.xml;
	var inChatList = false;
	var toFakeId;
	if(xml.MsgType[0]=='event'){
		if(xml.Event[0]=='subscribe'){
			return replyText(req,res,'hi～我是刘春洋，“小玩意儿”是我平时瞎折腾的地方，我会不定时地做一些好玩儿的小玩意儿与大家分享\n回复“捣鼓啥呢”可以看到我正在捣鼓神马。\n回复"灵魂附体吧！小强！！"可以召唤灵魂和你聊天。\nps：<a href="http://lcy-blog.com">这是我的部落格，欢迎来访～</a>');
		}
	}else if(xml.MsgType[0]=='text'){
		for(var i = 0;i<chatList.length;i++){
			if(chatList[i].hasOwnProperty(xml.FromUserName[0])){
				inChatList = true;
				for(prop in chatList[i]){
					if(prop != xml.FromUserName[0]){
						toFakeId = chatList[i][prop];
					}
				}
				break;
			}
		}
		if(inChatList){
			weixin.login(function(token,cookie){
				var options = {
					cookie:cookie,
					msg:xml.Content[0],
					token:token,
					fakeid:toFakeId
				}
				weixin.sender(options,function(text){
					console.log(text);
				});
			});
		}else{
			if(xml.Content[0]=='捣鼓啥呢'){
				return replyText(req,res,'<a href="http://lcy-blog.com/project/doing">好玩儿的，点我就告诉你</a>');
			}else if(xml.Content[0]=='灵魂附体吧！小强！！'){
				weixin.login(function(token,cookie){
					var options = {
						token:token,
						cookie:cookie
					}

					weixin.getFirstFakeId(options,function(fakeid){
						if(!waitList.hasOwnProperty(xml.FromUserName[0])){
							waitList[xml.FromUserName[0]] = fakeid;
							console.log('waitList:'+JSON.stringify(waitList));
							var count = 0;
							for(prop in waitList){
								count++;
							}
							if(count===2){
								chatList.push(waitList);
								waitList = {};
								var options = {
									cookie:cookie,
									msg:'hi~',
									token:token,
									fakeid:fakeid
								}
								weixin.sender(options,function(text){
									console.log(text);
								});
								console.log('chatList:'+JSON.stringify(chatList));
							}else{
								var options = {
									cookie:cookie,
									msg:'灵魂召唤中。。。',
									token:token,
									fakeid:fakeid
								}
								weixin.sender(options,function(text){
									console.log(text);
								});
							}
						}
					});
				});
				return res.send('');
			}
		}
		
	}
	return res.send('');
}

function replyText(req,res,content){
	var reply = new XMLWriter;
	var date = new Date();
	reply.startElement('ToUserName');
	reply.writeCData(req.body.xml.FromUserName[0]);
	reply.endElement();
	reply.startElement('FromUserName');
	reply.writeCData(req.body.xml.ToUserName[0]);
	reply.endElement();
	reply.startElement('CreateTime').text(date.getTime()+'').endElement();
	reply.startElement('MsgType');
	reply.writeCData('text');
	reply.endElement();
	reply.startElement('Content').text(content).endElement();
	console.log('<xml>'+reply.toString()+'</xml>');
	return res.send('<xml>'+reply.toString()+'</xml>');
}

function replyNews(req,res,articles){
	var reply = new XMLWriter;
	var date = new Date();
	reply.startElement('ToUserName');
	reply.writeCData(req.body.xml.FromUserName[0]);
	reply.endElement();
	reply.startElement('FromUserName');
	reply.writeCData(req.body.xml.ToUserName[0]);
	reply.endElement();
	reply.startElement('CreateTime').text(date.getTime()+'').endElement();
	reply.startElement('MsgType');
	reply.writeCData('news');
	reply.endElement();
	reply.startElement('ArticleCount').text('2').endElement();
	reply.startElement('Articles');
	for(var i = 0;i<articles.length;i++){
		reply.startElement('item');
		reply.startElement('Title');
		reply.writeCData(articles[i]['title']);
		reply.endElement();
		reply.startElement('Description');
		reply.writeCData(articles[i]['description']);
		reply.endElement();
		reply.startElement('PicUrl');
		reply.writeCData(articles[i]['picurl']);
		reply.endElement();
		reply.startElement('Url');
		reply.writeCData(articles[i]['url']);
		reply.endElement();
		reply.endElement();
	}
	reply.endElement();
	console.log('<xml>'+reply.toString()+'</xml>');
	return res.send('<xml>'+reply.toString()+'</xml>');
}

function letsChat(){}
var weixin = require('../tools/weixin');
var XMLWriter = require('xml-writer');
exports.index = function(req, res) {
	if (weixin.checkSignature(req.query.signature, req.query.timestamp, req.query.nonce)) {
		console.log(req.body);
		route(req,res);
	} else {
		return res.send(404);
	}
}

function route(req,res){
	if(req.body.xml.MsgType[0]=='event'){
		if(req.body.xml.Event[0]=='subscribe'){
			return replyText(req,res,'hi～我是刘春洋，“小玩意儿”是我平时瞎折腾的地方，我会不定时地做一些好玩儿的小玩意儿与大家分享，回复“捣鼓啥呢”可以看到我正在捣鼓神马。ps：<a href="http://lcy-blog.com">这是我的部落格，欢迎来访～</a>');
		}
	}else if(req.body.xml.MsgType[0]=='text'){
		if(req.body.xml.Content[0]=='捣鼓啥呢'){
			return replyText(req,res,'<a href="http://lcy-blog.com/project/doing">好玩儿的，点我就告诉你</a>');
		}else if(req.body.xml.MsgType[0]=='图文'){
			var articles = [];
			var firstarticle = {
				title:'Yesterday When I Was Young',
				description:"<p>Seems the love I've ever known</p>",
				picurl:"",
				url:'http://lcy-blog.com'
			}
			articles.push(firstarticle);
			return replyNews(req,res,articles);
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
	reply.startElement('ArticleCount').text(2).endElement();
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
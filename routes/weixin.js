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

exports.test = function(req,res){

}

function route(req,res){
	if(req.body.xml.MsgType[0]=='event'){
		if(req.body.xml.Event[0]=='subscribe'){
			return replyText(req,res,'hi～我是刘春洋，“小玩意儿”是我平时摆忙的地方，我会不定时地做一些好玩儿的小玩意儿与大家分享，回复test可以看到我正在捣鼓神马。ps：&lt;a href="http://lcy-blog.com"&gt;这是我的部落格，欢迎来访～&lt;/a&gt;');
		}
	}else if(req.body.xml.MsgType[0]=='text'){
		if(req.body.xml.Content[0]=='test'){
			return replyText(req,res,'http://lcy-blog.com/project/test');
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
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
			reply.startElement('Content');
			reply.writeCData('欢迎关注我的小玩意儿，这是我的博客http://lcy-blog.com欢迎来踩^_^');
			reply.endElement();
			console.log('<xml>'+reply.toString()+'</xml>');
			return res.send('<xml>'+reply.toString()+'</xml>');
		}
	}
	return res.send('');
}
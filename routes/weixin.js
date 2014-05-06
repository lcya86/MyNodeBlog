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
			reply.startDocument();
			reply.writeCData('ToUserName',req.body.xml.FromUserName[0]);
			reply.writeCData('FromUserName',req.body.xml.ToUserName[0]);
			reply.startElement('CreateTime').text(date.getTime()+'').endElement();
			reply.writeCData('MsgType','text');
			reply.writeCData('Content','欢迎关注我的小玩意儿，这是我的博客http://lcy-blog.com欢迎来踩^_^');
			reply.endDocument();
			console.log(reply.toString());
			return res.send(reply.toString());
		}
	}
	return res.send('');
}
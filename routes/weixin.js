var weixin = require('../tools/weixin');

exports.index = function(req, res) {
	if (weixin.checkSignature(req.query.signature, req.query.timestamp, req.query.nonce)) {
		console.log(req.body.Content);
		return res.send('');
	} else {
		return res.send(404);
	}
}
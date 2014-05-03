var weixin = require('../tools/weixin');

exports.index = function(req, res) {
	if (weixin.checkSignature(req.query.signature, req.query.timestamp, req.query.nonce)) {
		var result = '';
		console.log(req.read);
		return res.send('');
	} else {
		return res.send(404);
	}
}
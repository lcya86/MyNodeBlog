var crypto = require('crypto');
var TOKEN = 'lcya86'
exports.checkSignature = function(signature,timestamp,nonce){
	var tmpArr = [TOKEN,timestamp,nonce];
	tmpArr.sort();
	tmpStr = tmpArr.join('');
	var shasum = crypto.createHash('sha1');
	shasum.update(tmpStr);
	tmpStr = shasum.digest('hex');
	if(tmpStr == signature){
		return true;
	}else{
		return false;
	}
}
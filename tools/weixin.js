var crypto = require('crypto');
var shasum = crypto.createHash('sha1');
var TOKEN = 'lcya86'
exports.checkSignature = function(signature,timestamp,nonce){
	var tmpArr = [TOKEN,timestamp,nonce];
	tmpArr.sort();
	tmpStr = tmpArr.join('');
	shasum.update(tmpStr);
	tmpStr = shasum.digest('hex');
	if(tmpStr == signature){
		return true;
	}else{
		return false;
	}
}
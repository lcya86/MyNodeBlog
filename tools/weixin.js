var sha1 = require('./sha1');
exports.checkSignature = function(signature,timestamp,nonce){
	var tmpArr = [signature,timestamp,nonce];
	tmpArr.sort();
	tmpStr = tmpArr.join('');
	tmpStr = sha1.hex_sha1(tmpStr);
	if(tmpStr == signature){
		return true;
	}else{
		return false;
	}
}
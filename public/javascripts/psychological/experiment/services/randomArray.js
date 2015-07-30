angular.module('psychological.services',[])

.factory('randomArray',function(){
	//返回一个包含1到n的随机顺序数组
	return function(n){
		var result = [];
    var temp = [];
    for(var i = 0;i<n;i++){
      temp[i] = i+1;
    }
    for(var i = 0;i<n;i++){
      result[i] = temp.splice(Math.floor(Math.random ()*temp.length), 1)[0];
    }
    return result;
	}
});
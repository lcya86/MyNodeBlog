var mysql = require('mysql');
var utils = require('./Utils');

exports.press = function(code, times,fn) {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: ''
	});
	var extremum = [];
	connection.connect();
	connection.query("select * from AutoStock.minute_stock where code='" + code + "';", function(err, row, fields) {
		if (err) {
			throw err;
		}
		row = row.filter(function(item, index, array) { //去掉相邻重复值
			if (index === 0) {
				return true;
			}
			if (item.price === array[index - 1].price) {
				return false;
			}
			return true;
		});

		row.forEach(function(item, index, array) { //将row转为类型数组
			if (index > 0 && index + 1 < array.length) {
				if (item.price > array[index - 1].price && item.price > array[index + 1].price) {
					extremum.push([item.price, item.time, 'max']);
				} else if (item.price < array[index - 1].price && item.price < array[index + 1].price) {
					extremum.push([item.price, item.time, 'min']);
				} else if (item.price > array[index - 1].price && item.price < array[index + 1].price) {
					extremum.push([item.price, item.time, 'up']);
				} else if (item.price < array[index - 1].price && item.price > array[index + 1].price) {
					extremum.push([item.price, item.time, 'down']);
				} else if (item.price == array[index - 1].price && item.price == array[index + 1].price) {
					extremum.push([item.price, item.time, 'flat']);
				} else if (item.price == array[index - 1].price || item.price == array[index + 1].price) {
					extremum.push([item.price, item.time, 'turn']);
				}
			}
		});
		var i = 0;
		while (i < times) {
			extremum = extremum.filter(function(item, index, array) {
				if (index <= 1) {
					return true;
				}
				if (item[2] === 'min' && item[0] <= array[index - 2][0]) {
					return false;
				}
				if (item[2] === 'max' && item[0] >= array[index - 2][0]) {
					return false;
				}
				return true;
			});

			extremum = extremum.filter(function(item, index, array) { //去掉相邻重复值
				if (index === 0) {
					return true;
				}
				if (item[0] === array[index - 1][0]) {
					return false;
				}
				return true;
			});

			extremum.forEach(function(item, index, array) {
				if (index > 0 && index + 1 < array.length) {
					if (item[0] > array[index - 1][0] && item[0] > array[index + 1][0]) {
						item[2] = 'max';
					} else if (item[0] < array[index - 1][0] && item[0] < array[index + 1][0]) {
						item[2] = 'min';
					} else if (item[0] > array[index - 1][0] && item[0] < array[index + 1][0]) {
						item[2] = 'up';
					} else if (item[0] < array[index - 1][0] && item[0] > array[index + 1][0]) {
						item[2] = 'down';
					} else if (item[0] == array[index - 1][0] && item[0] == array[index + 1][0]) {
						item[2] = 'flat';
					} else if (item[0] == array[index - 1][0] || item[0] == array[index + 1][0]) {
						item[2] = 'turn';
					}
				}
			});

			i++;
		}



		connection.end();
		var labelList = extremum.map(function(item, index, array) {
			return '\''+item[1].getDate()+' '+item[1].toTimeString().substring(0,8)+'\'';
		});
		var dataList = extremum.map(function(item, index, array) {
			return item[0];
		});
		fn(labelList,dataList);
	});
}
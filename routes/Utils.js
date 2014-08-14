function eachSeries(arr, iterator, callback) {
  callback = callback || function() {};
  if (!arr.length) {
    return callback();
  }
  var completed = 0;
  var iterate = function() {
    iterator(arr[completed], completed, arr, function(err) {
      if (err) {
        callback(err);
        callback = function() {};
      } else {
        completed += 1;
        if (completed >= arr.length) {
          callback();
        } else {
          iterate();
        }
      }
    });
  };
  iterate();
};
exports.eachSeries = eachSeries;

function average(list) {
  return (sum(list) / list.length).toFixed(3);
}
exports.average = average;

function sum(list) {
  var sum = 0;
  list.forEach(function(item, index, array) {
    sum += item;
  });
  return sum;
}
exports.sum = sum;


exports.createStockList = function(first, last) {
  var result = [];
  var temp;
  first = parseInt(first);
  last = parseInt(last);
  for (var i = 0; i <= last - first; i++) {
    temp = first + i;
    if (temp >= 0 && temp < 10) {
      result[i] = '00000' + temp.toString(10);
    } else if (temp >= 10 && temp < 100) {
      result[i] = '0000' + temp.toString(10);
    } else if (temp >= 100 && temp < 1000) {
      result[i] = '000' + temp.toString(10);
    } else if (temp >= 1000 && temp < 10000) {
      result[i] = '00' + temp.toString(10);
    } else if (temp >= 10000 && temp < 100000) {
      result[i] = '0' + temp.toString(10);
    } else {
      result[i] = temp;
    }

  }
  return result;
};

function getSMA(list) {
  return average(list);
}
exports.getSMA = getSMA;

function getWMA(list) {
  return (sum(list.map(function(item, index, array) {
    return (index + 1) * item;
  })) * 2 / ((list.length * (list.length + 1)))).toFixed(3);
}
exports.getWMA = getWMA;

function getEMA(list) {
  var alpha = 2 / (list.length + 1);
  return (alpha * sum(list.map(function(item, index, array) {
    return item * Math.pow(1 - alpha, list.length - index + 1);
  }))).toFixed(3);
}
exports.getEMA = getEMA;

function getTrend(Xlist, Ylist) {
  var avgX = average(Xlist);
  var avgY = average(Ylist);
  var SX = sum(Xlist.map(function(item, index, array) {
    return Math.pow(item - avgX, 2);
  }));
  var SY = sum(Ylist.map(function(item, index, array) {
    return Math.pow(item - avgY, 2);
  }));
  return (SY / SX).toFixed(2);
}
exports.getTrend = getTrend;
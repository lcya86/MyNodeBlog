var model = require('../models');
exports.doing = function(req, res) {
	return res.render('doing');
}

exports.dontTouchWhite = function(req, res) {
	return res.render('project/dontTouchWhite');
}

exports.articlesClassify = function(req, res) {
	return res.render('project/articlesClassify');
}

exports.psychologicalExperiment = function(req, res) {
  model.MaterialImg.find().sort({'sequence':+1}).exec(function(err, materials) {
    return res.render('project/Psychological/Console', {
      material:materials
    });
  });
}

exports.doExperiment = function(req, res) {
  model.MaterialImg.find().sort({'sequence':+1}).exec(function(err, materials) {
    return res.render('project/Psychological/Experiment', {
      material:materials
    });
  });
}

exports.uploadImg = function(req,res){
  var fs = require('fs');
	var model = require('../models');
  var BufferHelper = require('bufferhelper');
  var name = req.query.name;
  var sequence = req.query.sequence;
  var polarity = req.query.polarity;
  var bufferHelper = new BufferHelper();
  req.on('data',function(chunk){
    bufferHelper.concat(chunk);
  });
  req.on('end',function(){
    fs.appendFile('/root/MyNodeBlog/public/upload/img/'+name, bufferHelper.toBuffer(), function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
      model.MaterialImg.create({
        content: '/upload/img/'+name,
        polarity:polarity,
        sequence:sequence
      }, function(err) {
        if (err) console.error(err);
        console.log('insert img:/root/MyNodeBlog/public/upload/img/'+name);
      });
      res.send({success:true});
    });
  });
  
}

exports.stock = function(req, res) {
	var press = require('./superPress').press;
	press(req.query.code,req.query.times,function(labels,data){
		return res.render('project/stock',{labels:labels,data:data});
	});
}
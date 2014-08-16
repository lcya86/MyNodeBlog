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
	return res.render('project/Psychological/Console');
}

exports.doExperiment = function(req, res) {
	return res.render('project/Psychological/Experiment');
}

exports.uploadImg = function(req,res){
	var model = require('../models');
  console.log(req.files);
	var file = req.files.img;
  var path = file.path;
  var name = file.name;
  model.Material.create({
    type: 'img',
    content: path,
  }, function(err) {
    if (err) console.error(err);
    console.log('insert img:'+path);
  });
  res.render('index', {success:true});
}

exports.stock = function(req, res) {
	var press = require('./superPress').press;
	press(req.query.code,req.query.times,function(labels,data){
		return res.render('project/stock',{labels:labels,data:data});
	});
}
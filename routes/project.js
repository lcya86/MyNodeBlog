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

exports.stock = function(req, res) {
	var press = require('./superPress').press;
	press(req.query.code,req.query.times,function(labels,data){
		return res.render('project/stock',{labels:labels,data:data});
	});
}
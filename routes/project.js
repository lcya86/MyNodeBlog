exports.doing = function(req, res) {
	return res.render('doing');
}

exports.dontTouchWhite = function(req, res) {
	return res.render('project/dontTouchWhite');
}

exports.articlesClassify = function(req, res) {
	return res.render('project/articlesClassify');
}

exports.PsychologicalExperiment = function(req, res) {
	return res.render('project/PsychologicalExperiment');
}

exports.stock = function(req, res) {
	var press = require('./superPress').press;
	var result = press(req.query.code,req.query.times);
	console.log(result);
	return res.render('project/stock');
}
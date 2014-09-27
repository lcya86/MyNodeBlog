var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materialImgSchema = new Schema({
	content: String,
	stage: Number,
	sequence: Number,//序号相同为一对
	polarity: Number//0为消极，1为积极
});
mongoose.model('MaterialImg', materialImgSchema);

var materialTextSchema = new Schema({
	sentence: String,
	pword: String,//中性词
	nword: String,//威胁词
	stage:Number
});
mongoose.model('MaterialText',materialTextSchema);

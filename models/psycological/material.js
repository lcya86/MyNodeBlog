var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materialImgSchema = new Schema({
	content: String,
	stage: Number,
	type:{type:Number,default:1},//1为实验组，0为控制组
	sequence: Number,//序号相同为一对
	polarity: Number//0为消极，1为积极
});
mongoose.model('MaterialImg', materialImgSchema);

var materialTextSchema = new Schema({
	sentence: String,
	pword: String,//中性词
	nword: String,//威胁词
	sequence: Number,
	type:{type:Number,default:1},//1为实验组，0为控制组
	stage:Number
});
mongoose.model('MaterialText',materialTextSchema);

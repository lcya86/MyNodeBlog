var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textresultSchema = new Schema({
	isMiss:{type:Boolean, default:false},
	isCorrect:{type:Boolean, default:false},
	reactTime:Number,
	sequence:Number,
	isUnderP:Boolean//字母是否在积极图片下
})
mongoose.model('TextResult', textresultSchema);

var textresultsSchema = new Schema({
	name: String,
	results:[textresultSchema],
	stage:Number,
	correctRate: String,
	timestamp:{ type: Date, default: Date.now }
})
mongoose.model('TextResults', textresultsSchema);

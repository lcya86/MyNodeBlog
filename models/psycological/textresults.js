var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textresultSchema = new Schema({
	isMiss:{type:Boolean, default:false},
	isCorrect:{type:Boolean, default:false},
	reactTime:Number,
	isUnderP:Boolean//字母是否在积极图片下
})
mongoose.model('Result', resultSchema);

var textresultsSchema = new Schema({
	name: String,
	results:[textresultSchema],
	stage:Number,
	timestamp:{ type: Date, default: Date.now }
})
mongoose.model('TextResults', textresultsSchema);

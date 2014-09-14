var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new Schema({
	isMiss:{type:Boolean, default:false},
	isCorrect:{type:Boolean, default:false},
	reactTime:Number,
	isUnderP:Boolean//字母是否在积极图片下
})
mongoose.model('Result', resultSchema);

var resultsSchema = new Schema({
	name: String,
	results:[resultSchema],
	stage:Number,
	timestamp:{ type: Date, default: Date.now }
})
mongoose.model('Results', resultsSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new Schema({
	isMiss:{type:Boolean, default:false},
	isCorrect:{type:Boolean, default:false},
	reactTime:Number,
	sequence:Number,
	isUnderP:String//字母是否在积极图片下
})
mongoose.model('Result', resultSchema);

var resultsSchema = new Schema({
	name: String,
	results:[resultSchema],
	stage:Number,
	correctRate: String,
	timestamp:{ type: Date, default: Date.now }
})
mongoose.model('Results', resultsSchema);

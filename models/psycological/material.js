var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materialImgSchema = new Schema({
	content: String,
	sequence:int,//序号相同为一对
	polarity: int//0为消极，1为积极
});
mongoose.model('MaterialImg', materialImgSchema);

var materialTextSchema = new Schema({
	sententce:String,
	pword:String,
	nword:String
});
mongoose.model('MaterialText',materialTextSchema);

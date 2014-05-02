var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagSchema = new Schema({
	name:String,
	size:Number
})
mongoose.model('Tag', tagSchema);

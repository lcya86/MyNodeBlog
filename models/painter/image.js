var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	parent: String,
	base64: String,
	timestamp: String
})
mongoose.model('Image', imageSchema);
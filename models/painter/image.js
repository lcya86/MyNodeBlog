var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	parent: String,
	base64: String,
	timestamp: String
})
mongoose.model('Image', imageSchema);
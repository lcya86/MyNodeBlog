var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materialSchema = new Schema({
	type: String,
	content: String,
})
mongoose.model('Material', materialSchema);

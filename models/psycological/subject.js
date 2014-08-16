var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
	name: String,
})
mongoose.model('Subject', subjectSchema);

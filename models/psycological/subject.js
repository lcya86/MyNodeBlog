var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
	name: String,
	type: Number//1为实验组，0为控制组
})
mongoose.model('Subject', subjectSchema);

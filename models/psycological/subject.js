var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
	name: String,
	complete:[Boolean],
	type: Number//1为实验组1,2为实验组2,0为控制组1,-1为控制组2
})
mongoose.model('Subject', subjectSchema);

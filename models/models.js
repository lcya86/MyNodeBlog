var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/session");


var Schema = mongoose.Schema;
var tagSchema = new Schema({
	name:String,
	size:Number
})
exports.Tag = mongoose.model('Tag', tagSchema);


var postSchema = new Schema({
	body: String,
	title: String,
	tags: [tagSchema],
	update: { type: Date, default: Date.now }
})
exports.Post = mongoose.model('Post', postSchema);

var visitorSchema = new Schema({
	ip:String,
	hostName:String,
	frequency:{type:Number,default:0},
	lastVisitTime:Date
})
exports.Visitor = mongoose.model('Visitor',visitorSchema);
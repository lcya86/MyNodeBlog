var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
	name:String,
	size:Number
})
exports.Tag = mongoose.model('Tag', tagSchema);


var postSchema = new Schema({
	body: String,
	tags: [tagSchema],
	update: { type: Date, default: Date.now }
})
exports.Post = mongoose.model('Post', postSchema);
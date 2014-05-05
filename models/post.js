var Schema = mongoose.Schema;

var postSchema = new Schema({
	body: String,
	title: String,
	like:{type:Number,default:0},
	tags: [tagSchema],
	update: { type: Date, default: Date.now }
})
mongoose.model('Post', postSchema);
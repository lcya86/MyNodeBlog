var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitorSchema = new Schema({
	ip:String,
	frequency:{type:Number,default:0},
	agent:String,
	country:String,
	province:String,
	city:String,
	lastVisitTime:Date
})
mongoose.model('Visitor',visitorSchema);
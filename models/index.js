var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/session");

require('./post');
require('./tag');
require('./visitor');

exports.Tag = mongoose.model('Tag');
exports.Post = mongoose.model('Post');
exports.Visitor = mongoose.model('Visitor');
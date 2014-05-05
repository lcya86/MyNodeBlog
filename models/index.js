var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/session");

require('./post');
require('./tag');
require('./visitor');

exports.Post = mongoose.model('Post');
exports.Tag = mongoose.model('Tag');
exports.Visitor = mongoose.model('Visitor');
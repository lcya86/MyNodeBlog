var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/session");

require('./post');
require('./tag');
require('./visitor');
require('./psycological/material');
require('./psycological/subject');

exports.Post = mongoose.model('Post');
exports.Tag = mongoose.model('Tag');
exports.Visitor = mongoose.model('Visitor');
exports.Material = mongoose.model('Material');
exports.Subject = mongoose.model('Subject');
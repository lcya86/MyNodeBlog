var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/session");

require('./post');
require('./tag');
require('./visitor');
require('./psycological/material');
require('./psycological/subject');
require('./psycological/results');

exports.Post = mongoose.model('Post');
exports.Tag = mongoose.model('Tag');
exports.Visitor = mongoose.model('Visitor');
exports.MaterialImg = mongoose.model('MaterialImg');
exports.MaterialText = mongoose.model('MaterialText');
exports.Subject = mongoose.model('Subject');
exports.Results = mongoose.model('Results');
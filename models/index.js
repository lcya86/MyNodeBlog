var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/session");

require('./post');
require('./tag');
require('./visitor');
require('./painter/image')
require('./psycological/material');
require('./psycological/subject');
require('./psycological/results');
require('./psycological/textresults');

exports.Post = mongoose.model('Post');
exports.Tag = mongoose.model('Tag');
exports.Visitor = mongoose.model('Visitor');
exports.MaterialImg = mongoose.model('MaterialImg');
exports.MaterialText = mongoose.model('MaterialText');
exports.Subject = mongoose.model('Subject');
exports.Results = mongoose.model('Results');
exports.TextResults = mongoose.model('TextResults');
exports.Images = mongoose.model('Image');
exports.MaterialImgPairs = mongoose.model('MaterialImgPair');
var model = require('../models');
exports.doing = function(req, res) {
  return res.render('doing');
}

exports.dontTouchWhite = function(req, res) {
  return res.render('project/dontTouchWhite');
}

exports.articlesClassify = function(req, res) {
  return res.render('project/articlesClassify');
}

exports.psychologicalExperiment = function(req, res) {
  var async = require('async');

  var Materials, Subjects, sc_count, cs_count, ts_count, csc_count, tsc_count;

  async.parallel([

    function(callback) {
      model.MaterialImg.find().sort({
        'sequence': +1
      }).exec(function(err, materials) {
        if (err) console.error(err);
        Materials = materials;
        callback(null, '');
      });
    },
    function(callback) {
      model.Subject.find(function(err, subjects) {
        if (err) console.error(err);
        Subjects = subjects;
        callback(null, '');
      });
    },
    function(callback) {
      model.Subject.count({
        complete: true
      }, function(err, data) { //实验组人数
        if (err) console.error(err);
        sc_count = data;
        callback(null, 'three');
      });
    },
    function(callback) {
      model.Subject.count({
        type: 1
      }, function(err, data) { //实验组人数
        if (err) console.error(err);
        ts_count = data;
        callback(null, 'four');
      });
    },
    function(callback) {
      model.Subject.count({
        type: 0
      }, function(err, data) { //控制组人数
        if (err) console.error(err);
        cs_count = data;
        callback(null, 'five');
      });
    },
    function(callback) {
      model.Subject.count({
        type: 1,
        complete: true
      }, function(err, data) { //实验组完成人数
        if (err) console.error(err);
        tsc_count = data;
        callback(null, 'six');
      });
    },
    function(callback) {
      model.Subject.count({
        type: 0,
        complete: true
      }, function(err, data) { //控制组完成人数
        if (err) console.error(err);
        csc_count = data;
        callback(null, 'seven');
      });
    }
  ], function(err, result) {
    if (err) console.error(err);
    console.log(result);
    return res.render('project/Psychological/Console', {
      material: Materials,
      subjects: Subjects,
      cs_count: cs_count,
      ts_count: ts_count,
      sc_count: sc_count,
      csc_count: csc_count,
      tsc_count: tsc_count
    });
  });
}

exports.doExperiment = function(req, res) {
  model.MaterialImg.find().sort({
    'sequence': +1
  }).exec(function(err, materials) {
    return res.render('project/Psychological/Experiment', {
      material: materials
    });
  });
}

exports.addSubject = function(req, res) {
  var name = req.body.name;
  var type = req.body.type;
  model.Subject.create({
    name: name,
    type: type
  }, function(err, item) {
    if (err) {
      console.error(err);
      res.send({
        success: false
      });
    }
    res.send({
      success: true,
      name: item.name,
      id: item._id
    });
  });
}

exports.uploadImg = function(req, res) {
  var fs = require('fs');
  var model = require('../models');
  var BufferHelper = require('bufferhelper');
  var name = req.query.name;
  var sequence = req.query.sequence;
  var polarity = req.query.polarity;
  var bufferHelper = new BufferHelper();
  req.on('data', function(chunk) {
    bufferHelper.concat(chunk);
  });
  req.on('end', function() {
    fs.writeFile('/root/MyNodeBlog/public/upload/img/' + name, bufferHelper.toBuffer(), function(err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
      model.MaterialImg.create({
        content: '/upload/img/' + name,
        polarity: polarity,
        sequence: sequence
      }, function(err) {
        if (err) console.error(err);
        console.log('insert img:/root/MyNodeBlog/public/upload/img/' + name);
      });
      res.send({
        success: true
      });
    });
  });

}

exports.delImg = function(req, res) {
  var model = require('../models');
  var id = req.body.id;
  console.log(id);
  model.MaterialImg.findById(id, function(err, img) {
    if (err) {
      console.error(err);
    }
    model.MaterialImg.update({
      polarity: img.polarity,
      sequence: {
        $gt: img.sequence
      }
    }, {
      $inc: {
        sequence: -1
      }
    }, {
      multi: true
    });
  });
  model.MaterialImg.findByIdAndRemove(id, function(err) {
    if (err) {
      console.error(err);
      return res.send({
        success: false
      });
    }
    return res.send({
      success: true
    });
  });
}

exports.stock = function(req, res) {
  var press = require('./superPress').press;
  press(req.query.code, req.query.times, function(labels, data) {
    return res.render('project/stock', {
      labels: labels,
      data: data
    });
  });
}
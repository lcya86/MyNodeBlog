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

  async.parallel({

    
    one:function(cb) {
      model.Subject.find(function(err, subjects) {
        if (err) console.error(err);
        Subjects = subjects;
        cb(null);
      });
    },
    two:function(cb) {
      model.MaterialImg.find().sort({
        'sequence': +1
      }).exec(function(err, materials) {
        if (err) console.error(err);
        Materials = materials;
        cb(null);
      });
    },
    three:function(cb) {
      model.Subject.count({
        complete: true
      }, function(err, data) { //实验组人数
        if (err) console.error(err);
        sc_count = data;
        cb(null);
      });
    },
    four:function(cb) {
      model.Subject.count({
        type: 1
      }, function(err, data) { //实验组人数
        if (err) console.error(err);
        ts_count = data;
        cb(null);
      });
    },
    five:function(cb) {
      model.Subject.count({
        type: 0
      }, function(err, data) { //控制组人数
        if (err) console.error(err);
        cs_count = data;
        cb(null);
      });
    },
    six:function(cb) {
      model.Subject.count({
        type: 1,
        complete: true
      }, function(err, data) { //实验组完成人数
        if (err) console.error(err);
        tsc_count = data;
        cb(null);
      });
    },
    seven:function(cb) {
      model.Subject.count({
        type: 0,
        complete: true
      }, function(err, data) { //控制组完成人数
        if (err) console.error(err);
        csc_count = data;
        cb(null);
      });
    }
  }, function(err, result) {
    if (err) console.error(err);
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
        res.send({
          success: true
        });
      });
    });
  });

}

exports.delImg = function(req, res) {
  var model = require('../models');
  var id = req.body.id;
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
    },function(err){
      if(err) console.error(err);
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
    });
  });
}

exports.delSubject = function(req,res){
  var id = req.body.subject_id;
  model.Subject.findByIdAndRemove(id, function(err) {
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

exports.subjectLogin = function(req,res){
  var name = req.query.name;
  model.Subject.find({name:name},function(err,subject){
    if(err) console.error(err);
    console.log({success:true,type:subject.type,complete:subject.complete});
    if(subject.length>0) return res.send({success:true,type:subject.type,complete:subject.complete});
    return res.send({success:false});
  });
}

exports.sendResult = function(req,res){
  var name = req.body.name;
  var result = req.body.result;
  model.Results.create({name:name,results:result},function(err){
    if(err){
      console.error(err); 
      return res.send({success:false});
    }
    model.Subject.update({name:name},{complete:true},function(err){
      if(err){
        console.error(err); 
        return res.send({success:false});
      }
      return res.send({success:true});
    });
  });
}

exports.getResult = function(req,res){
  var name = req.query.name;
  model.Results.findOne({name:name},function(err,result){
    if(err){
      console.error(err);
      return res.send({success:false});
    }
    console.log(result);
    if(result){
      return res.send({success:true,results:result.results});
    }
    return res.send({success:false});
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
var model = require('../models');
var weixin = require('../tools/weixin');
var crypto = require('crypto');
exports.doing = function(req, res) {
  return res.render('doing');
}

exports.dontTouchWhite = function(req, res) {
  return res.render('project/dontTouchWhite');
}

exports.articlesClassify = function(req, res) {
  return res.render('project/articlesClassify');
}


exports.painter = function(req, res) {
  var timestamp = Date.now();
  var picTimestamp = req.param('timestamp');
  var sign = '';
  console.log('url:'+req.originalUrl);
  weixin.getJsapiTicket(function(ticket){
    sign = 'jsapi_ticket='+ticket+'&noncestr=Wm3WZYTPz0wzccnW&timestamp='+timestamp+'&url=http://lcy-blog.com'+req.originalUrl;
    var sha1 = crypto.createHash('sha1');
    sha1.update(sign);
    sign = sha1.digest('hex');
    if(picTimestamp){
      model.Images.findOne({timestamp:picTimestamp},function(err,image){
        if(err){
          console.error(err);
        }
        if(image){
          return res.render('project/painter',{parent:picTimestamp,pic_base64:image.base64,sign:sign,timestamp:timestamp,nonceStr:'Wm3WZYTPz0wzccnW'});
        }else{
          return res.render('project/painter',{parent:picTimestamp,pic_base64:'',sign:sign,timestamp:timestamp,nonceStr:'Wm3WZYTPz0wzccnW'});
        }
      });
    }else{
      return res.render('project/painter',{parent:0,sign:sign,pic_base64:'',timestamp:timestamp,nonceStr:'Wm3WZYTPz0wzccnW'});
    }
  });
}

exports.saveImage = function(req,res){
  var timestamp = req.param("timestamp");
  var parent = req.body.parent || 0;
  var base64 = req.body.base64;
  model.Images.create({
    timestamp:timestamp,
    parent: parent,
    base64: base64
  }, function(err, item) {
    if (err) {
      console.error(err);
      res.send({
        success: false
      });
    }else{
      res.redirect(req.originalUrl);
    }
  });
}

exports.psychologicalExperiment = function(req, res) {
  var async = require('async');
  var Materials,Texts, Subjects, sc_count, cs_count, ts_count, csc_count, tsc_count,practice_text_count,test_text_count,train_text_count;
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
    },
    eight:function(cb){
      model.MaterialText.find(function(err, data) {
        if (err) console.error(err);
        Texts = data;
        cb(null);
      });
    },
    nine:function(cb){
      model.MaterialText.count({stage:1},function(err,data){
        if (err) console.error(err);
        practice_text_count = data
        cb(null);
      });
    },
    ten:function(cb){
      model.MaterialText.count({stage:2},function(err,data){
        if (err) console.error(err);
        test_text_count = data
        cb(null);
      });
    },
    eleven:function(cb){
      model.MaterialText.count({stage:3},function(err,data){
        if (err) console.error(err);
        train_text_count = data
        cb(null);
      });
    }
  }, function(err, result) {
    if (err) console.error(err);
    return res.render('project/Psychological/Console', {
      material: Materials,
      text:Texts,
      practice_text_count:practice_text_count,
      test_text_count:test_text_count,
      train_text_count:train_text_count,
      subjects: Subjects,
      cs_count: cs_count,
      ts_count: ts_count,
      sc_count: sc_count,
      csc_count: csc_count,
      tsc_count: tsc_count
    });
  });
}

exports.doPractice = function(req, res) {
  model.MaterialImg.find({stage:1}).sort({
    'sequence': +1
  }).exec(function(err, materials) {
    return res.render('project/Psychological/Experiment', {
      material: materials,
      stage:1,
      stage_text:'练习'
    });
  });
}

exports.doTest = function(req,res){
  model.MaterialImg.find({stage:2}).sort({
    'sequence': +1
  }).exec(function(err, materials) {
    return res.render('project/Psychological/Experiment', {
      material: materials,
      stage:2,
      stage_text:'测试'
    });
  });
}

exports.doTrain = function(req,res){
  model.MaterialImg.find({stage:3}).sort({
    'sequence': +1
  }).exec(function(err, materials) {
    return res.render('project/Psychological/Experiment', {
      material: materials,
      stage:3,
      stage_text:'训练'
    });
  });
}

exports.doTextPractice = function(req, res) {
  model.MaterialText.find({stage:1}).sort({
    'sequence': +1
  }).exec(function(err, data) {
    return res.render('project/Psychological/TextExperiment', {
      texts: data,
      stage:1,
      stage_text:'练习'
    });
  });
}

exports.doTextTest = function(req,res){
  model.MaterialText.find({stage:2}).sort({
    'sequence': +1
  }).exec(function(err, data) {
    return res.render('project/Psychological/TextExperiment', {
      texts: data,
      stage:2,
      stage_text:'测试'
    });
  });
}

exports.doTextTrain = function(req,res){
  model.MaterialText.find({stage:3}).sort({
    'sequence': +1
  }).exec(function(err, data) {
    return res.render('project/Psychological/TextExperiment', {
      texts: data,
      stage:3,
      stage_text:'训练'
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

exports.addText = function(req,res){
  var sentence = req.body.sentence;
  var nword = req.body.nword;
  var pword = req.body.pword;
  var stage = req.body.stage;
  if(sentence==''||nword==''||pword==''){
    return res.send({success:false,msg:'句子和词不能为空'});
  }
  model.MaterialText.create({sentence:sentence,nword:nword,pword:pword,stage:stage},function(err,item){
    if (err) {
      console.error(err);
      res.send({
        success: false
      });
    }
    res.send({
      success: true,
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
  var stage = req.query.stage;
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
        stage:stage,
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
      stage:img.stage,
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
    if(subject.length>0) return res.send({success:true,type:subject[0].type,complete:subject[0].complete});
    return res.send({success:false});
  });
}

exports.sendResult = function(req,res){
  var name = req.body.name;
  var result = req.body.result;
  var stage = req.body.stage;
  model.Results.create({name:name,results:result,stage:stage},function(err){
    if(err){
      console.error(err); 
      return res.send({success:false});
    }
    model.Subject.update({name:name},{complete:{$push:true}},function(err){
      if(err){
        console.error(err); 
        return res.send({success:false});
      }
      return res.send({success:true});
    });
  });
}

exports.sendTextResult = function(req,res){
  var name = req.body.name;
  var result = req.body.result;
  var stage = req.body.stage;
  model.TextResults.create({name:name,results:result,stage:stage},function(err){
    if(err){
      console.error(err); 
      return res.send({success:false});
    }
    model.Subject.update({name:name},{complete:{$push:true}},function(err){
      if(err){
        console.error(err); 
        return res.send({success:false});
      }
      return res.send({success:true});
    });
  });
}

exports.getResult = function(req,res){
  var async = require('async');
  var name = req.query.name;
  var practice,test,train;
  async.parallel({
    one:function(cb){
      model.Results.find({name:name,stage:1}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          practice = data;
        }
        cb(null);
      });
    },
    two:function(cb){
      model.Results.find({name:name,stage:2}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          test = data;
        }
        cb(null);
      });
    },
    three:function(cb){
      model.Results.find({name:name,stage:3}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          train = data;
        }
        cb(null);
      });
    }
  },function(err,result){
    if(err){
      console.error(err);
      return res.send({success:false});
    }
    return res.send({success:true,practice:practice,test:test,train:train});
  });
}

exports.getTextResult = function(req,res){
  var async = require('async');
  var name = req.query.name;
  var practice,test,train;
  async.parallel({
    one:function(cb){
      model.TextResults.find({name:name,stage:1}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          practice = data;
        }
        cb(null);
      });
    },
    two:function(cb){
      model.TextResults.find({name:name,stage:2}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          test = data;
        }
        cb(null);
      });
    },
    three:function(cb){
      model.TextResults.find({name:name,stage:3}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          train = data;
        }
        cb(null);
      });
    }
  },function(err,result){
    if(err){
      console.error(err);
      return res.send({success:false});
    }
    return res.send({success:true,practice:practice,test:test,train:train});
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
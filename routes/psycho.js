var model = require('../models');

exports.console = function(req,res){
  res.render('project/Psychological/v2/console');
}

exports.getSubjects = function(req,res){
  var type = req.query.type;
  var complete = req.query.complete;
  if(type){
    model.Subject.find({
      type:type
    },function(err, data) {
      if(err) throw err;
      return res.send({success:true,subjects:data});
    });
  }else if(complete){
    model.Subject.find({
      complete:complete
    },function(err, data) {
      if(err) throw err;
      return res.send({success:true,subjects:data});
    });
  }else{
    model.Subject.find(function(err, data) {
      if(err) throw err;
      return res.send({success:true,subjects:data});
    });
  }
}

exports.doPractice = function(req, res) {
  res.render('project/Psychological/v2/practice');
}

exports.doImageExperiment = function(req,res){
  res.render('project/Psychological/v2/imageExperiment');
}

exports.doTextExperiment = function(req,res){
  res.render('project/Psychological/v2/TextExperiment');
}

exports.doTextPractice = function(req, res) {
  model.MaterialText.find({stage:1}).sort({
    'sequence': +1
  }).exec(function(err, data) {
    return res.render('project/Psychological/v2/TextExperiment', {
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
    return res.render('project/Psychological/v2/TextExperiment', {
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
    return res.render('project/Psychological/v2/TextExperiment', {
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
  var sequence = req.body.sequence;
  var type = req.body.type;
  if(sentence==''||nword==''||pword==''){
    return res.send({success:false,msg:'句子和词不能为空'});
  }
  model.MaterialText.create({sentence:sentence,nword:nword,pword:pword,stage:stage,type:type,sequence:sequence},function(err,item){
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

exports.getSentences = function(req,res){
  var type = req.query.type;
  var stage = req.query.stage;
  model.MaterialText.find({
    type:type,
    stage:stage
  },function(err,data){
    if(err) throw err;
    return res.send({success:true,sentences:data});
  });
}

exports.deleteSentence = function(req,res){
  var id = req.params.id;
  model.MaterialText.findById(id, function(err, pair) {
    if (err) {
      console.error(err);
    }
    model.MaterialText.update({
      type: pair.type,
      stage:pair.stage,
      sequence: {
        $gt: pair.sequence
      }
    }, {
      $inc: {
        sequence: -1
      }
    }, {
      multi: true
    },function(err){
      if(err) throw err;
      model.MaterialText.findByIdAndRemove(id, function(err) {
        if(err) throw err;
        return res.send({success:true});
      });
    });
  });
}

exports.deleteSubject = function(req,res){
  var id = req.params.id;
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

exports.uploadImg = function(req, res) {
  var fs = require('fs');
  var BufferHelper = require('bufferhelper');
  var name = req.query.name;
  var bufferHelper = new BufferHelper();
  req.on('data', function(chunk) {
    bufferHelper.concat(chunk);
  });
  req.on('end', function() {
    fs.writeFile('/root/MyNodeBlog/public/upload/img/' + name, bufferHelper.toBuffer(), function(err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
      res.send({sucess:true});
    });
  });
}

exports.addPairs = function(req, res){
  var upImg = req.body.upImg;
  var downImg = req.body.downImg;
  var letter = req.body.letter;
  var type = req.body.type;//1为实验组，0为控制组
  var positivePosition = req.body.positivePosition;//字母出现在中性图片后的概率
  var stage = req.body.stage;
  var sequence = req.body.sequence;
  model.MaterialImgPairs.create({
    upImg: upImg,
    downImg: downImg,
    letter: letter,
    type: type,
    positivePosition: positivePosition,
    stage: stage,
    sequence: sequence
  },function(err,item){
    if (err){
      console.error(err);
      return res.send({
        success: false
      });
    }
    res.send({
      success: true,
      id: item._id
    });
  });
}

exports.getPairs = function(req, res){
  var type = req.query.type;
  var stage = req.query.stage;
  model.MaterialImgPairs.find({
    type:type,
    stage:stage
  },function(err,data){
    if(err) throw err;
    return res.send({success:true,pairs:data});
  });
}

exports.deletePair = function(req, res){
  var id = req.params.id;
  model.MaterialImgPairs.findById(id, function(err, pair) {
    if (err) {
      console.error(err);
    }
    model.MaterialImgPairs.update({
      type: pair.type,
      stage:pair.stage,
      sequence: {
        $gt: pair.sequence
      }
    }, {
      $inc: {
        sequence: -1
      }
    }, {
      multi: true
    },function(err){
      if(err) throw err;
      model.MaterialImgPairs.findByIdAndRemove(id, function(err) {
        if(err) throw err;
        return res.send({success:true});
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

exports.subjectLogin = function(req,res){
  var name = req.body.name;
  model.Subject.find({name:name},function(err,subject){
    if(err) console.error(err);
    if(subject.length>0) return res.send({success:true,type:subject[0].type,complete:subject[0].complete});
    return res.send({success:false,msg:'姓名不存在！'});
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
  var practice,test1,train,test2;
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
          test1 = data;
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
    },
    four:function(cb){
      model.Results.find({name:name,stage:4}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          test2 = data;
        }
        cb(null);
      });
    }
  },function(err,result){
    if(err){
      console.error(err);
      return res.send({success:false});
    }
    return res.send({success:true,practice:practice,test1:test1,train:train,test2:test2});
  });
}

exports.getTextResult = function(req,res){
  var async = require('async');
  var name = req.query.name;
  var practice,test1,train,test2;
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
          test1 = data;
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
    },
    four:function(cb){
      model.TextResults.find({name:name,stage:4}).sort('+timestamp').exec(function(err,data){
        if(err){
          console.error(err);
          return res.send({success:false});
        }
        if(data){
          test2 = data;
        }
        cb(null);
      });
    }
  },function(err,result){
    if(err){
      console.error(err);
      return res.send({success:false});
    }
    return res.send({success:true,practice:practice,test1:test1,train:train,test2:test2});
  });
}

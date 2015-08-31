angular.module('experiment.directives',['angular-gestures'])

.directive('login',['$http',function($http){
  return {
    restrict:'E',
    scope:{
      index:'@index'
    },
    templateUrl:'/templates/psychological/login.html',
    replace:true,
    link:function(scope,element,attr){
      scope.step = {};
      scope.step.index = 0;

      scope.step.isCurrent = function(){
        return scope.$parent.state.current == scope.step.index;
      };

      scope.step.login = function(){
        $http.post('/project/psychological/v2/experiment/login',{
          name:scope.$parent.state.name
        }).success(function(data){
          if(data.success){
            scope.$parent.state.nextStep();
          }else{
            alert(data.msg);
          }
        });
      };
    }
  }
}])

.directive('break',function(){
  return {
    restrict:'E',
    scope:{
      index:'@index'
    },
    templateUrl:'/templates/psychological/image_welcome.html',
    replace:true,
    transclude:true,
    link:function(scope,element,attr){
      scope.step = {};
      scope.step.index = scope.index;
      scope.step.isCurrent = function(){
        return scope.$parent.state.current == scope.step.index;
      };
    }
  }
})

.directive('textWelcome',function(){
  return {
    restrict:'E',
    scope:{
      index:'@index'
    },
    templateUrl:'/templates/psychological/text_welcome.html',
    replace:true,
    link:function(scope,element,attr){
      scope.step = {};
      scope.step.index = scope.index;
      scope.step.isCurrent = function(){
        return scope.$parent.state.current == scope.step.index;
      };
    }
  }
})


.directive('end',function(){
  return {
    restrict:'E',
    scope:{
      index:'@index'
    },
    templateUrl:'/templates/psychological/end.html',
    replace:true,
    link:function(scope,element,attr){
      scope.step = {};
      scope.step.index = scope.index;
      scope.step.isCurrent = function(){
        return scope.$parent.state.current == scope.step.index;
      } 
    }
  }
})


.directive('textExperiment',['$http','$timeout',function($http,$timeout){
  return {
    restrict:'E',
    scope:{
      index:'@index',
      stage:'@stage',
      type:'@type',
      hasFeedBack:'@hasfeedback',
      upLoadResult:'@uploadresult',
      halflist:'@halflist'
    },
    templateUrl:'/templates/psychological/text_experiment.html',
    replace:true,
    link:function(scope,element,attr){
      scope.step = {};
      scope.step.index = scope.index;
      scope.step.sentences = [];
      scope.step.currentSentence = -1;
      scope.step.progress = 0;
      scope.step.stage = scope.stage;
      scope.step.type = scope.type;
      scope.step.subStage = 1;
      scope.step.results = [];
      scope.step.startTime = 0;
      scope.step.readTime = 0;
      scope.step.reactive = false;
      scope.step.miss = false;
      scope.step.showPword = false;
      scope.step.repeatTime = 0;
      scope.step.feedback = '';
      scope.step.pbstyle = {
        "width":scope.step.progress+"%"
      };
      
      scope.step.isCurrent = function(){
        return scope.$parent.state.current == scope.step.index;
      }
      scope.step.getSentences = function(){
        $http.get('/project/psychological/v2/console/getSentences?type='+scope.step.type+'&stage='+scope.step.stage)
          .success(function(data){
            if(scope.halflist){
              scope.step.sentences = data.sentences.sort(function(){
                return Math.random() > .5 ? -1 : 1;
              }).splice(0,80);
            }else{
              scope.step.sentences = data.sentences.sort(function(){
                return Math.random() > .5 ? -1 : 1;
              });
            }
          });
      };
      scope.step.getSentences();

      scope.step.clickButton = function(button,sentence){
        scope.step.results[scope.step.currentSentence].reactTime = (new Date().getTime()) - scope.step.startTime;
        scope.step.miss = false;
        scope.step.results[scope.step.currentSentence].isMiss = false;
        scope.step.results[scope.step.currentSentence].sequence = sentence.sequence;
        if((button===1 && scope.step.showPword)||(button===3 && !scope.step.showPword)){
          scope.step.results[scope.step.currentSentence].isCorrect = true;
          scope.step.feedback = "你是正确的！";
        }else{
          scope.step.results[scope.step.currentSentence].isCorrect = false;
          scope.step.feedback = "你是错误的！";
        }
        if(scope.hasFeedBack){
          scope.step.nextSubStage();
          var t1 = $timeout(function(){
            $timeout.cancel(t1);
            scope.step.nextSentence();
          },500);
        }else{
          scope.step.nextSentence();
        }
      };

      scope.step.nextSubStage = function(){
        scope.step.subStage += 1;
      };

      scope.step.continue = function(){
        var readtime = (new Date().getTime()) - scope.step.readTime;
        if(readtime<1500){
          alert('请认真阅读情境');
          scope.step.readTime = new Date().getTime();
        }else{
          scope.step.subStage += 1;
          scope.step.results[scope.step.currentSentence].readTime = readtime;
          scope.step.startTime = new Date().getTime();
        }
      };

      scope.step.isShowPword = function(){
        return Math.random() < 0.5;
      };

      scope.step.nextSentence = function(){
        if(scope.step.currentSentence == scope.step.sentences.length-1){
          var cr = scope.step.correctRate();

          if(scope.upLoadResult){
            return scope.step.sendResult((cr*100)+'%');
          }else{
            return scope.$parent.state.nextStep();
          }
        }
        scope.step.subStage = 1;
        scope.step.currentSentence += 1;
        scope.step.results[scope.step.currentSentence] = {};
        scope.step.progress = (scope.step.currentSentence/scope.step.sentences.length).toFixed(2)*100;
        scope.step.pbstyle = {
          "width":scope.step.progress+"%"
        };
        var t1 = $timeout(function(){
          $timeout.cancel(t1);
          scope.step.nextSubStage();
          scope.step.showPword = scope.step.isShowPword();
          scope.step.results[scope.step.currentSentence].isUnderP = scope.step.showPword;
        },500);
        var t2 = $timeout(function(){
          scope.step.nextSubStage();
          scope.step.miss = true;
          scope.step.readTime = new Date().getTime();
          $timeout.cancel(t2);
        },1000);
      };

      scope.step.correctRate = function(){
        var correctCountList = scope.step.results.filter(function(item){
          return item.isCorrect;
        });
        return (correctCountList.length/scope.step.results.length).toFixed(2);
      };

      scope.step.repeat = function(){
        scope.step.currentSentence = -1;
        scope.step.progress = 0;
        scope.step.stage = 2;
        scope.step.type = 1;
        scope.step.subStage = 1;
        scope.step.results = [];
        scope.step.startTime = 0;
        scope.step.reactive = false;
        scope.step.miss = false;
        scope.step.showUp = false;
        scope.step.timer = null;
        scope.step.repeatTime += 1;
        scope.step.pbstyle = {
          "width":scope.step.progress+"%"
        };
        scope.step.sentences = scope.step.sentences.sort(function(){
          return Math.random() > .5 ? -1 : 1;
        });
        scope.step.nextSentence();
      };

      scope.step.sendResult = function(correctRate){
        $http.post('/project/psychological/v2/experiment/sendtextresult',{
          result:scope.step.results,
          name:scope.$parent.state.name,
          stage:scope.step.stage,
          correctRate:correctRate
        }).success(function(data){
          scope.$parent.state.nextStep();
        });
      };

      scope.$watch('$parent.state.current',function(nv,ov){
        if(nv==scope.step.index){
          scope.step.nextSentence();
        }
      });

    }
  }
}])

.directive('imageExperiment',['$http','$timeout',function($http,$timeout){
  return {
    restrict:'E',
    scope:{
      index:'@index',
      stage:'@stage',
      type:'@type',
      upLoadResult:'@uploadresult',
      halflist:'@halflist'
    },
    templateUrl:'/templates/psychological/image_experiment.html',
    replace:true,
    link:function(scope,element,attr){
      scope.step = {};
      scope.step.index = scope.index;
      scope.step.pairs = [];
      scope.step.currentPair = -1;
      scope.step.progress = 0;
      scope.step.stage = scope.stage;
      scope.step.type = scope.type;
      scope.step.subStage = 1;
      scope.step.results = [];
      scope.step.startTime = 0;
      scope.step.reactive = false;
      scope.step.miss = false;
      scope.step.showUp = false;
      scope.step.timer = null;
      scope.step.repeatTime = 0;
      scope.step.pbstyle = {
        "width":scope.step.progress+"%"
      };
      
      scope.step.isCurrent = function(){
        return scope.$parent.state.current == scope.step.index;
      }
      scope.step.getPairs = function(){
        $http.get('/project/psychological/v2/getpairs?type='+scope.step.type+'&stage='+scope.step.stage)
          .success(function(data){
            if(scope.halflist){
              var range = [];
              for(var i=0;i<80;i++){
                range.push(i+1);
              }
              for(i=160;i<240;i++){
                range.push(i+1);
              }
              for(i=320;i<400;i++){
                range.push(i+1);
              }
              for(i=480;i<560;i++){
                range.push(i+1);
              }
              for(i=640;i<680;i++){
                range.push(i+1);
              }
              for(i=720;i<760;i++){
                range.push(i+1);
              }
              scope.step.pairs = data.pairs.filter(function(item,index,array){
                return item.sequence in range;
              }).sort(function(){
                return Math.random() > .5 ? -1 : 1;
              });
            }else{
              scope.step.pairs = data.pairs.sort(function(){
                return Math.random() > .5 ? -1 : 1;
              });
            }
          });
      };
      scope.step.getPairs();
      
      scope.step.clickButton = function(button,pair){
        scope.step.results[scope.step.currentPair].reactTime = (new Date().getTime()) - scope.step.startTime;
        scope.step.miss = false;
        $timeout.cancel(scope.step.timer);
        scope.step.results[scope.step.currentPair].isMiss = false;
        scope.step.results[scope.step.currentPair].sequence = pair.sequence;
        if(button==pair.letter){
          scope.step.results[scope.step.currentPair].isCorrect = true;
        }else{
          scope.step.results[scope.step.currentPair].isCorrect = false;
        }
        scope.step.nextPair();
      };

      scope.step.nextSubStage = function(){
        scope.step.subStage += 1;
      };

      scope.step.isShowUp = function(pair){
        if(scope.stage==1||scope.stage==2||scope.stage==4){
          return (Math.random().toFixed(2) < pair.positivePosition.toFixed(2));
        }else{
          return (Math.random().toFixed(2) < pair.positivePosition.toFixed(2))&&(/.*(-03).*/.test(scope.step.pairs[scope.step.currentPair].upImg));
        }
      };

      scope.step.nextPair = function(){
        if(scope.step.currentPair == scope.step.pairs.length-1){
          var cr = scope.step.correctRate();
          if(scope.upLoadResult){
            return scope.step.sendResult((cr*100)+'%');
          }else{
            if(cr >= 0.7 || scope.step.repeatTime >= 2){
              return scope.$parent.state.nextStep();
            }else{
              alert('您的正确率为'+(cr*100)+'% 没有达到70%，请重新练习。');
              return scope.step.repeat();
            }
          }
        }
        scope.step.subStage = 1;
        scope.step.currentPair += 1;
        scope.step.results[scope.step.currentPair] = {};
        scope.step.progress = (scope.step.currentPair/scope.step.pairs.length).toFixed(2)*100;
        scope.step.pbstyle = {
          "width":scope.step.progress+"%"
        };
        var t1 = $timeout(function(){
          scope.step.nextSubStage();
          scope.step.showUp = scope.step.isShowUp(scope.step.pairs[scope.step.currentPair]);
        },500);
        var t2 = $timeout(function(){
          scope.step.nextSubStage();
          if(scope.step.stage==3){
            if(scope.step.showUp&&/.*(-03).*/.test(scope.step.pairs[scope.step.currentPair].upImg)){
              scope.step.results[scope.step.currentPair].isUnderP = true;
            }else if(!scope.step.showUp&&/.*(-03).*/.test(scope.step.pairs[scope.step.currentPair].downImg)){
              scope.step.results[scope.step.currentPair].isUnderP = true;
            }else{
              scope.step.results[scope.step.currentPair].isUnderP = false;
            }
          }else{
            if(scope.step.showUp&&/.*(-04).*/.test(scope.step.pairs[scope.step.currentPair].upImg)){
              scope.step.results[scope.step.currentPair].isUnderP = true;
            }else if(!scope.step.showUp&&/.*(-04).*/.test(scope.step.pairs[scope.step.currentPair].downImg)){
              scope.step.results[scope.step.currentPair].isUnderP = true;
            }else{
              scope.step.results[scope.step.currentPair].isUnderP = false;
            }
          }
          scope.step.startTime = new Date().getTime();
          scope.step.miss = true;
        },1000);
        var t3 = scope.step.timer = $timeout(function(){
          $timeout.cancel(t1);
          $timeout.cancel(t2);
          $timeout.cancel(t3);
          if(scope.step.miss){
            scope.step.results[scope.step.currentPair].isMiss = true;
            scope.step.results[scope.step.currentPair].reactTime = 2000;
            scope.step.results[scope.step.currentPair].sequence = scope.step.pairs[scope.step.currentPair].sequence;
            scope.step.nextPair();
          }
        },3000);
      };

      scope.step.correctRate = function(){
        var correctCountList = scope.step.results.filter(function(item){
          return item.isCorrect;
        });
        return (correctCountList.length/scope.step.results.length).toFixed(2);
      }

      scope.step.repeat = function(){
        scope.step.currentPair = -1;
        scope.step.progress = 0;
        scope.step.stage = 2;
        scope.step.type = 1;
        scope.step.subStage = 1;
        scope.step.results = [];
        scope.step.startTime = 0;
        scope.step.reactive = false;
        scope.step.miss = false;
        scope.step.showUp = false;
        scope.step.timer = null;
        scope.step.repeatTime += 1;
        scope.step.pbstyle = {
          "width":scope.step.progress+"%"
        };
        scope.step.pairs = scope.step.pairs.sort(function(){
          return Math.random() > .5 ? -1 : 1;
        });
        scope.step.nextPair();
      };

      scope.step.sendResult = function(correctRate){
        $http.post('/project/psychological/v2/experiment/sendresult',{
          result:scope.step.results,
          correctRate:correctRate,
          name:scope.$parent.state.name,
          stage:scope.step.stage
        }).success(function(data){
          scope.$parent.state.nextStep();
        });
      };

      scope.$watch('$parent.state.current',function(nv,ov){
        if(nv==scope.step.index){
          scope.step.nextPair();
        }
      });

    }
  }
}])

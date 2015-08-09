angular.module('experiment.text.directives',['angular-gestures'])

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

.directive('welcome',function(){
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

.directive('break',function(){
  return {
    restrict:'E',
    scope:{
      index:'@index'
    },
    templateUrl:'/templates/psychological/break.html',
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


.directive('textPractice',['$http','$timeout',function($http,$timeout){
  return {
    restrict:'E',
    scope:{
      index:'@index'
    },
    templateUrl:'/templates/psychological/text_practice.html',
    replace:true,
    link:function(scope,element,attr){
      scope.step = {};
      scope.step.index = scope.index;
      scope.step.sentences = [];
      scope.step.currentSentence = -1;
      scope.step.progress = 0;
      scope.step.stage = 1;
      scope.step.type = 1;
      scope.step.subStage = 1;
      scope.step.results = [];
      scope.step.startTime = 0;
      scope.step.reactive = false;
      scope.step.miss = false;
      scope.step.showPword = false;
      scope.step.repeatTime = 0;
      scope.step.pbstyle = {
        "width":scope.step.progress+"%"
      };
      
      scope.step.isCurrent = function(){
        return scope.$parent.state.current == scope.step.index;
      }
      scope.step.getSentences = function(){
        $http.get('/project/psychological/v2/console/getSentences?type='+scope.step.type+'&stage='+scope.step.stage)
          .success(function(data){
            scope.step.sentences = data.sentences.sort(function(){
              return Math.random() > .5 ? -1 : 1;
            });
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
        }else{
          scope.step.results[scope.step.currentSentence].isCorrect = false;
        }
        scope.step.nextSentence();
      };

      scope.step.nextSubStage = function(){
        scope.step.subStage += 1;
      };

      scope.step.continue = function(){
        scope.step.subStage += 1;
        scope.step.startTime = new Date().getTime();
      };

      scope.step.isShowPword = function(){
        return Math.random() < 0.5;
      };

      scope.step.nextSentence = function(){
        if(scope.step.currentSentence == scope.step.sentences.length-1){
          var cr = scope.step.correctRate();
          if(cr >= 0.7 || scope.step.repeatTime >= 2){
            return scope.$parent.state.nextStep();
          }else{
            alert('您的正确率为'+(cr*100)+'% 没有达到70%，请重新练习。');
            return scope.step.repeat();
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
          scope.step.nextSubStage();
          scope.step.showPword = scope.step.isShowPword();
        },500);
        var t2 = $timeout(function(){
          scope.step.nextSubStage();
          scope.step.miss = true;
          $timeout.cancel(t1);
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

      scope.$watch('$parent.state.current',function(nv,ov){
        if(nv==scope.step.index){
          scope.step.nextSentence();
        }
      });

    }
  }
}])

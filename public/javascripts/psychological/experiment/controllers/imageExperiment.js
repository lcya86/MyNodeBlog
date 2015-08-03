angular.module('psychological.test&train',['angular-gestures'])

.config(function (hammerDefaultOptsProvider) {
  hammerDefaultOptsProvider.set({
      recognizers: [[Hammer.Tap, {time: 250}]]
  });
})


.controller('doExperiment',['$scope',function($scope){
  $scope.state = {};
  $scope.state.current = 0;
  $scope.state.name = '';

  $scope.state.nextStep = function(){
    $scope.state.current += 1;
  };

  $scope.state.toStep = function(index){
    $scope.state.current = index;
  };
  

}])

.controller('login',['$scope','$http',function($scope,$http){
  $scope.step = {};
  $scope.step.index = 0;

  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  };

  $scope.step.login = function(){
    $http.post('/project/psychological/v2/experiment/login',{
      name:$scope.state.name
    }).success(function(data){
      if(data.success){
        $scope.state.nextStep();
      }else{
        alert(data.msg);
      }
    });
  };

}])

.controller('welcome',['$scope',function($scope){
  $scope.step = {};
  $scope.step.index = 1;
  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  }
}])

.controller('practice',['$scope','$http','$timeout',function($scope,$http,$timeout){
  $scope.step = {};
  $scope.step.index = 2;
  $scope.step.pairs = [];
  $scope.step.currentPair = -1;
  $scope.step.progress = 0;
  $scope.step.stage = 1;
  $scope.step.type = 1;
  $scope.step.subStage = 1;
  $scope.step.results = [];
  $scope.step.startTime = 0;
  $scope.step.reactive = false;
  $scope.step.miss = false;
  $scope.step.showUp = false;
  $scope.step.timer = null;
  $scope.step.repeatTime = 0;
  $scope.step.pbstyle = {
    "width":$scope.step.progress+"%"
  };
  
  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  }
  $scope.step.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type='+$scope.step.type+'&stage='+$scope.step.stage)
      .success(function(data){
        $scope.step.pairs = data.pairs.sort(function(){
          return Math.random() > .5 ? -1 : 1;
        });
      });
  };
  $scope.step.getPairs();
  
  $scope.step.clickButton = function(button,pair){
    $scope.step.results[$scope.step.currentPair].reactTime = (new Date().getTime()) - $scope.step.startTime;
    $scope.step.miss = false;
    $timeout.cancel($scope.step.timer);
    $scope.step.results[$scope.step.currentPair].isMiss = false;
    $scope.step.results[$scope.step.currentPair].sequence = pair.sequence;
    if(button==pair.letter){
      $scope.step.results[$scope.step.currentPair].isCorrect = true;
    }else{
      $scope.step.results[$scope.step.currentPair].isCorrect = false;
    }
    $scope.step.nextPair();
  };

  $scope.step.nextSubStage = function(){
    $scope.step.subStage += 1;
  };

  $scope.step.isShowUp = function(pair){
    return Math.random().toFixed(2) < pair.positivePosition.toFixed(2);
  };

  $scope.step.nextPair = function(){
    if($scope.step.currentPair == $scope.step.pairs.length-1){
      var cr = $scope.step.correctRate();
      if($scope.step.correctRate() > 0.7 || $scope.step.repeatTime > 2){
        return $scope.state.nextStep();
      }else{
        alert('您的正确率为'+(cr*100)+'% 没有达到95%，请重新练习。');
        return $scope.step.repeat();
      }
    }
    $scope.step.subStage = 1;
    $scope.step.currentPair += 1;
    $scope.step.results[$scope.step.currentPair] = {};
    $scope.step.progress = ($scope.step.currentPair/$scope.step.pairs.length).toFixed(2)*100;
    $scope.step.pbstyle = {
      "width":$scope.step.progress+"%"
    };
    var t1 = $timeout(function(){
      $scope.step.nextSubStage();
      $scope.step.showUp = $scope.step.isShowUp($scope.step.pairs[$scope.step.currentPair]);
    },500);
    var t2 = $timeout(function(){
      $scope.step.nextSubStage();
      $scope.step.startTime = new Date().getTime();
      $scope.step.miss = true; 
    },1000);
    var t3 = $scope.step.timer = $timeout(function(){
      $timeout.cancel(t1);
      $timeout.cancel(t2);
      $timeout.cancel(t3);
      if($scope.step.miss){
        $scope.step.results[$scope.step.currentPair].isMiss = true;
        $scope.step.results[$scope.step.currentPair].reactTime = 1000;
        $scope.step.results[$scope.step.currentPair].sequence = $scope.step.pairs[$scope.step.currentPair].sequence;
        $scope.step.nextPair();
      }
    },2000);
  };

  $scope.step.correctRate = function(){
    var correctCount = $scope.step.pairs.filter(function(item){
      return item.isCorrect;
    }).length;
    return (correctCount/$scope.step.pairs.length).toFixed(2);
  }

  $scope.step.repeat = function(){
    $scope.step.currentPair = -1;
    $scope.step.progress = 0;
    $scope.step.stage = 2;
    $scope.step.type = 1;
    $scope.step.subStage = 1;
    $scope.step.results = [];
    $scope.step.startTime = 0;
    $scope.step.reactive = false;
    $scope.step.miss = false;
    $scope.step.showUp = false;
    $scope.step.timer = null;
    $scope.step.repeatTime += 1;
    $scope.step.pbstyle = {
      "width":$scope.step.progress+"%"
    };
    $scope.step.pairs = $scope.step.pairs.sort(function(){
      return Math.random() > .5 ? -1 : 1;
    });
    $scope.step.nextPair();
  };

  $scope.$watch('state.current',function(nv,ov){
    if(nv===$scope.step.index){
      $scope.step.nextPair();
    }
  });

}])

.controller('break',['$scope',function($scope){
  $scope.step = {};
  $scope.step.index = 3;
  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  };
}])

.controller('testController',['$scope','$http','$timeout',function($scope,$http,$timeout){
  $scope.test = {};
  $scope.test.index = 4;
  $scope.test.pairs = [];
  $scope.test.currentPair = -1;
  $scope.test.progress = 0;
  $scope.test.stage = 2;
  $scope.test.type = 1;
  $scope.test.subStage = 1;
  $scope.test.results = [];
  $scope.test.startTime = 0;
  $scope.test.reactive = false;
  $scope.test.miss = false;
  $scope.test.showUp = false;
  $scope.test.timer = null;
  $scope.test.pbstyle = {
    "width":$scope.test.progress+"%"
  };
  
  $scope.test.isCurrent = function(){
    return $scope.state.current === $scope.test.index;
  }
  $scope.test.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type='+$scope.test.type+'&stage='+$scope.test.stage)
      .success(function(data){
        $scope.test.pairs = data.pairs.sort(function(){
          return Math.random() > .5 ? -1 : 1;
        });
      });
  };
  $scope.test.getPairs();
  
  $scope.test.clickButton = function(button,pair){
    $scope.test.results[$scope.test.currentPair].reactTime = (new Date().getTime()) - $scope.test.startTime;
    $scope.test.miss = false;
    $timeout.cancel($scope.test.timer);
    $scope.test.results[$scope.test.currentPair].isMiss = false;
    $scope.test.results[$scope.test.currentPair].sequence = pair.sequence;
    if(button==pair.letter){
      $scope.test.results[$scope.test.currentPair].isCorrect = true;
    }else{
      $scope.test.results[$scope.test.currentPair].isCorrect = false;
    }
    $scope.test.nextPair();
  };

  $scope.test.nextSubStage = function(){
    $scope.test.subStage += 1;
  };

  $scope.test.isShowUp = function(pair){
    return Math.random().toFixed(2) < pair.positivePosition.toFixed(2);
  };

  $scope.test.nextPair = function(){
    if($scope.test.currentPair == $scope.test.pairs.length-1){
      return $scope.test.sendResult();
    }
    $scope.test.subStage = 1;
    $scope.test.currentPair += 1;
    $scope.test.results[$scope.test.currentPair] = {};
    $scope.test.progress = ($scope.test.currentPair/$scope.test.pairs.length).toFixed(2)*100;
    $scope.test.pbstyle = {
      "width":$scope.test.progress+"%"
    };
    var t1 = $timeout(function(){
      $scope.test.nextSubStage();
      $scope.test.showUp = $scope.test.isShowUp($scope.test.pairs[$scope.test.currentPair]);
    },500);
    var t2 = $timeout(function(){
      $scope.test.nextSubStage();
      $scope.test.startTime = new Date().getTime();
      $scope.test.miss = true; 
    },1000);
    var t3 = $scope.test.timer = $timeout(function(){
      $timeout.cancel(t1);
      $timeout.cancel(t2);
      $timeout.cancel(t3);
      if($scope.test.miss){
        $scope.test.results[$scope.test.currentPair].isMiss = true;
        $scope.test.results[$scope.test.currentPair].reactTime = 1000;
        $scope.test.results[$scope.test.currentPair].sequence = $scope.test.pairs[$scope.test.currentPair].sequence;
        $scope.test.nextPair();
      }
    },2000);
  };

  $scope.test.sendResult = function(){
    $http.post('/project/psychological/experiment/sendresult',{
      result:$scope.test.results,
      name:$scope.state.name,
      stage:$scope.test.stage
    }).success(function(data){
      $scope.state.nextStep();
    });
  };

  $scope.$watch('state.current',function(nv,ov){
    if(nv===$scope.test.index){
      $scope.test.nextPair();
    }
  });

}])

.controller('break',['$scope',function($scope){
  $scope.step = {};
  $scope.step.index = 5;
  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  };
}])

.controller('trainController',['$scope','$http','$timeout',function($scope,$http,$timeout){
  $scope.train = {};
  $scope.train.index = 6;
  $scope.train.pairs = [];
  $scope.train.currentPair = -1;
  $scope.train.progress = 0;
  $scope.train.stage = 3;
  $scope.train.type = 1;
  $scope.train.subStage = 1;
  $scope.train.results = [];
  $scope.train.startTime = 0;
  $scope.train.reactive = false;
  $scope.train.miss = false;
  $scope.train.showUp = false;
  $scope.train.timer = null;
  $scope.train.pbstyle = {
    "width":$scope.train.progress+"%"
  };
  
  $scope.train.isCurrent = function(){
    return $scope.state.current === $scope.train.index;
  }
  $scope.train.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type='+$scope.train.type+'&stage='+$scope.train.stage)
      .success(function(data){
        $scope.train.pairs = data.pairs.sort(function(){
          return Math.random() > .5 ? -1 : 1;
        });
      });
  };
  $scope.train.getPairs();
  
  $scope.train.clickButton = function(button,pair){
    $scope.train.results[$scope.train.currentPair].reactTime = (new Date().getTime()) - $scope.train.startTime;
    $scope.train.miss = false;
    $timeout.cancel($scope.train.timer);
    $scope.train.results[$scope.train.currentPair].isMiss = false;
    $scope.train.results[$scope.train.currentPair].sequence = pair.sequence;
    if(button==pair.letter){
      $scope.train.results[$scope.train.currentPair].isCorrect = true;
    }else{
      $scope.train.results[$scope.train.currentPair].isCorrect = false;
    }
    $scope.train.nextPair();
  };

  $scope.train.nextSubStage = function(){
    $scope.train.subStage += 1;
  };

  $scope.train.isShowUp = function(pair){
    return /.+03.+/.test(pair.upImg);
  };

  $scope.train.nextPair = function(){
    if($scope.train.currentPair == $scope.train.pairs.length-1){
      return $scope.train.sendResult();
    }
    $scope.train.subStage = 1;
    $scope.train.currentPair += 1;
    $scope.train.results[$scope.train.currentPair] = {};
    $scope.train.progress = ($scope.train.currentPair/$scope.train.pairs.length).toFixed(2)*100;
    $scope.train.pbstyle = {
      "width":$scope.train.progress+"%"
    };
    var t1 = $timeout(function(){
      $scope.train.nextSubStage();
      $scope.train.showUp = $scope.train.isShowUp($scope.train.pairs[$scope.train.currentPair]);
    },500);
    var t2 = $timeout(function(){
      $scope.train.nextSubStage();
      $scope.train.startTime = new Date().getTime();
      $scope.train.miss = true; 
    },1000);
    var t3 = $scope.train.timer = $timeout(function(){
      $timeout.cancel(t1);
      $timeout.cancel(t2);
      $timeout.cancel(t3);
      if($scope.train.miss){
        $scope.train.results[$scope.train.currentPair].isMiss = true;
        $scope.train.results[$scope.train.currentPair].reactTime = 1000;
        $scope.train.results[$scope.train.currentPair].sequence = $scope.train.pairs[$scope.train.currentPair].sequence;
        $scope.train.nextPair();
      }
    },2000);
  };

  $scope.train.sendResult = function(){
    $http.post('/project/psychological/experiment/sendresult',{
      result:$scope.train.results,
      name:$scope.state.name,
      stage:$scope.train.stage
    }).success(function(data){
      $scope.state.nextStep();
    });
  };

  $scope.$watch('state.current',function(nv,ov){
    if(nv===$scope.train.index){
      $scope.train.nextPair();
    }
  });

}])

.controller('end',['$scope',function($scope){
  $scope.step = {};
  $scope.step.index = 7;
  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  }
}]);
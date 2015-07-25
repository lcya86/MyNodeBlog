angular.module('psychological.experiment',[])

.controller('doExperiment',['$scope',function($scope){
  $scope.state = {};
  $scope.state.current = 0;
  $scope.state.name = '';

  $scope.state.nextStep = function(){
    $scope.state.current += 1;
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

.controller('test',['$scope','$http','$timeout',function($scope,$http,$timeout){
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
  
  
  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  }
  $scope.step.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type='+$scope.step.type+'&stage='+$scope.step.stage)
      .success(function(data){
        $scope.step.pairs = data.pairs;
      });
  };
  $scope.step.getPairs();
  
  $scope.step.clickButton = function(button,pair){
    if($scope.step.subStage == 3){
      $scope.step.results[$scope.step.currentPair].reactTime = (new Date().getTime()) - $scope.step.startTime;
      if(button==pair.letter){
        result[count].isCorrect = true;
      }else{
        result[count].isCorrect = false;
      }
      $scope.step.nextPair();
    }
  };

  $scope.step.nextSubStage = function(){
    $scope.step.subStage += 1;
  };

  $scope.step.nextPair = function(){
    
    $scope.step.subStage = 1;
    $scope.step.currentPair += 1;
    $scope.step.results[$scope.step.currentPair] = {};
    $scope.step.progress = ($scope.step.currentPair/$scope.step.pairs.length).toFixed(2);
    $timeout(function(){
      $scope.step.nextSubStage();
    },500);
    $timeout(function(){
      $scope.step.nextSubStage();
      $scope.step.startTime = new Date().getTime();
      reactive = true;
      miss = true; 
    },1000);
    $timeout(function(){
      if(miss){
        $scope.step.results[$scope.step.currentPair].isMiss = miss;
        $scope.step.results[$scope.step.currentPair].reactTime = 1000;
        $scope.step.nextPair();
      }
    },2000);
  };

  $scope.step.sendResult = function(){
    $http.post('/project/psychological/experiment/sendresult',{
      result:$scope.step.results,
      name:$scope.state.name,
      stage:$scope.step.stage
    }).success(function(data){
      $scope.state.nextStep();
    });
  };

  $scope.$watch('state.current',function(nv,ov){
    if(nv===2){
      $scope.step.nextPair();
    }
  });

}]);
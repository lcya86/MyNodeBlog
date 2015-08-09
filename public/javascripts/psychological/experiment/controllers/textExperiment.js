angular.module('psychological.text',['angular-gestures','experiment.text.directives'])

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

.controller('break1',['$scope',function($scope){
  $scope.step = {};
  $scope.step.index = 3;
  $scope.step.isCurrent = function(){
    return $scope.state.current === $scope.step.index;
  };
}])
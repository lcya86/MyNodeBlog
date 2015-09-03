angular.module('psychological.control',['angular-gestures','experiment.directives'])

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
  $scope.state.toEnd = function(){
    $scope.state.current = 18;
  };
  

}])


angular.module('psychological',['psychological.directives'])

.controller('material_manage',function($scope){
  $scope.activeTab = 1;

  $scope.select = function(tab){
    $scope.activeTab = tab;
  };

  $scope.isSelected = function(tab){
    return $scope.activeTab === tab;
  };


})


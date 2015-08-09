angular.module('psychological',['psychological.directives'])

.controller('console',function($scope){
  $scope.activeTab = 'material';

  $scope.active = function(tab){
    return $scope.activeTab = tab;
  };

  $scope.isActive = function(tab){
    return $scope.activeTab == tab;
  };
})

.controller('material_manage',function($scope){
  $scope.activeTab = 1;

  $scope.select = function(tab){
    $scope.activeTab = tab;
  };

  $scope.isSelected = function(tab){
    return $scope.activeTab === tab;
  };


})

.controller('subjects_manage',function($scope){
  
})


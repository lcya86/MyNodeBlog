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

.controller('result_manage', ['$scope', function($scope){
  $scope.activeTab = 1;

  $scope.select = function(tab){
    $scope.activeTab = tab;
  };

  $scope.isSelected = function(tab){
    return $scope.activeTab === tab;
  };
}])

.controller('imageresult', ['$scope','$http', function($scope,$http){
  $scope.subjects = [];
  $scope.practice_results = [];
  $scope.test1_results = [];
  $scope.test2_results = [];
  $scope.train_results = [];
  $scope.current_result = [];

  $scope.showResult = function(result){
    $scope.current_result = result.results;
  }

  $scope.getSubjects = function(){
    $http.get('/project/psychological/v2/console/getSubjects?complete=true').success(function(data){
      scope.subjects = data.subjects;
    });
  };
  $scope.getSubjects();

  $scope.getResults = function(subject){
    $http.get('/project/psychological/v2/console/getresult?name='+subject.name).success(function(data){
      $scope.practice_results = data.practice;
      $scope.test1_results = data.test1;
      $scope.test2_results = data.test2;
      $scope.train_results = data.train;
    });
  }

}])

.controller('textresult', ['$scope','$http', function($scope,$http){
  $scope.subjects = [];
  $scope.practice_results = [];
  $scope.test1_results = [];
  $scope.test2_results = [];
  $scope.train_results = [];
  $scope.current_result = [];

  $scope.showResult = function(result){
    $scope.current_result = result.results;
  }

  $scope.getSubjects = function(){
    $http.get('/project/psychological/v2/console/getSubjects?complete=true').success(function(data){
      scope.subjects = data.subjects;
    });
  };
  $scope.getSubjects();

  $scope.getResults = function(subject){
    $http.get('/project/psychological/v2/console/gettextresult?name='+subject.name).success(function(data){
      $scope.practice_results = data.practice;
      $scope.test1_results = data.test1;
      $scope.test2_results = data.test2;
      $scope.train_results = data.train;
    });
  }
}])

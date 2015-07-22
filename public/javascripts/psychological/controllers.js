angular.module('psychological',[])

.controller('material_manage',function($scope){
  $scope.activeTab = 1;

  $scope.select = function(tab){
    $scope.activeTab = tab;
  };

  $scope.isSelected = function(tab){
    return $scope.activeTab === tab;
  };


})


.controller('practice_image',['$scope','$http',function($scope,$http){
  $scope.array = [];
  $scope.is_creating = false;
  $scope.upImg = '';
  $scope.downImg = '';

  $scope.creating = function(){
    $scope.is_creating = true;
  };

  $scope.isCreating = function(){
    return $scope.is_creating;
  };

  $scope.submit = function(){
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.letter,
      type: 1,
      positivePosition: $scope.position,
      stage: 1,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
      }else{
        alert('添加失败');
      }
    });
  };
}])

.controller('practice_image_con',['$scope','$http',function($scope,$http){
  $scope.array = [];
  $scope.is_creating = false;
  $scope.upImg = '';
  $scope.downImg = '';

  $scope.creating = function(){
    $scope.is_creating = true;
  };

  $scope.isCreating = function(){
    return $scope.is_creating;
  };

  $scope.submit = function(){
    $http.post('/project/psychological/v2/addpairs',{
      upImg: upImg,
      downImg: downImg,
      letter: $scope.letter,
      type: 0,
      positivePosition: $scope.position,
      stage: 1,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
      }else{
        alert('添加失败');
      }
    });
  };
}])

.controller('test_image',['$scope','$http',function($scope,$http){
  $scope.array = [];
  $scope.is_creating = false;
  $scope.upImg = '';
  $scope.downImg = '';

  $scope.creating = function(){
    $scope.is_creating = true;
  };

  $scope.isCreating = function(){
    return $scope.is_creating;
  };

  $scope.submit = function(){
    $http.post('/project/psychological/v2/addpairs',{
      upImg: upImg,
      downImg: downImg,
      letter: $scope.letter,
      type: 1,
      positivePosition: $scope.position,
      stage: 2,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
      }else{
        alert('添加失败');
      }
    });
  };
}])

.controller('test_image_con',['$scope','$http',function($scope,$http){
  $scope.array = [];
  $scope.is_creating = false;
  $scope.upImg = '';
  $scope.downImg = '';

  $scope.creating = function(){
    $scope.is_creating = true;
  };

  $scope.isCreating = function(){
    return $scope.is_creating;
  };

  $scope.submit = function(){
    $http.post('/project/psychological/v2/addpairs',{
      upImg: upImg,
      downImg: downImg,
      letter: $scope.letter,
      type: 0,
      positivePosition: $scope.position,
      stage: 2,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
      }else{
        alert('添加失败');
      }
    });
  };
}])

.controller('train_image',['$scope','$http',function($scope,$http){
  $scope.array = [];
  $scope.is_creating = false;
  $scope.upImg = '';
  $scope.downImg = '';

  $scope.creating = function(){
    $scope.is_creating = true;
  };

  $scope.isCreating = function(){
    return $scope.is_creating;
  };

  $scope.submit = function(){
    $http.post('/project/psychological/v2/addpairs',{
      upImg: upImg,
      downImg: downImg,
      letter: $scope.letter,
      type: 1,
      positivePosition: $scope.position,
      stage: 3,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
      }else{
        alert('添加失败');
      }
    });
  };
}])

.controller('train_image_con',['$scope','$http',function($scope,$http){
  $scope.array = [];
  $scope.is_creating = false;
  $scope.upImg = '';
  $scope.downImg = '';

  $scope.creating = function(){
    $scope.is_creating = true;
  };

  $scope.isCreating = function(){
    return $scope.is_creating;
  };

  $scope.submit = function(){
    $http.post('/project/psychological/v2/addpairs',{
      upImg: upImg,
      downImg: downImg,
      letter: $scope.letter,
      type: 0,
      positivePosition: $scope.position,
      stage: 3,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
      }else{
        alert('添加失败');
      }
    });
  };
}]);

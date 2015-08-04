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

  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };

  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=1&stage=1').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  };

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 1,
      positivePosition: $scope.$$childTail.position,
      stage: 1,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };

  
  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=0&stage=1').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  }

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 0,
      positivePosition: $scope.$$childTail.position,
      stage: 1,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
}])

.controller('test1_image',['$scope','$http',function($scope,$http){
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  
  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=1&stage=2').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  }

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 1,
      positivePosition: $scope.$$childTail.position,
      stage: 2,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
}])

.controller('test1_image_con',['$scope','$http',function($scope,$http){
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  
  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=0&stage=2').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  }

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 0,
      positivePosition: $scope.$$childTail.position,
      stage: 2,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
}])

.controller('test2_image',['$scope','$http',function($scope,$http){
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  
  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=1&stage=2').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  }

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 1,
      positivePosition: $scope.$$childTail.position,
      stage: 4,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
}])

.controller('test2_image_con',['$scope','$http',function($scope,$http){
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  
  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=0&stage=2').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  }

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 0,
      positivePosition: $scope.$$childTail.position,
      stage: 4,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  
  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=1&stage=3').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  }

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 1,
      positivePosition: $scope.$$childTail.position,
      stage: 3,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
}])

.controller('train_image_con',['$scope','$http',function($scope,$http){
  $scope.array = [];
  $scope.is_creating = false;
  $scope.upImg = '';
  $scope.downImg = '';
  $scope.letter = '';
  $scope.position = 0;

  $scope.creating = function(){
    $scope.is_creating = true;
  };

  $scope.isCreating = function(){
    return $scope.is_creating;
  };
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  
  $scope.getPairs = function(){
    $http.get('/project/psychological/v2/getpairs?type=0&stage=3').success(function(data){
      $scope.array = data.pairs;
    });
  };

  $scope.delete = function(item){
    $http.delete('/project/psychological/v2/pairs/'+item._id)
      .success(function(data){
        $scope.getPairs();
      });
  }

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
    $http.post('/project/psychological/v2/addpairs',{
      upImg: $scope.upImg,
      downImg: $scope.downImg,
      letter: $scope.$$childTail.letter,
      type: 0,
      positivePosition: $scope.$$childTail.position,
      stage: 3,
      sequence: $scope.array.length+1
    }).success(function(data){
      if(data.success){
        $scope.is_creating = false;
        $scope.getPairs();
      }else{
        alert('添加失败');
      }
    });
  };

  $scope.getPairs();
}]);

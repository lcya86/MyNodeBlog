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

  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };

  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
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
  $scope.cancelCreating = function(){
    $scope.is_creating = false;
  };
  $scope.submit = function(){
    if($scope.upImg=='' || $scope.downImg==''){
      alert('请添加图片');
      return false;
    }
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
}])
.directive("imageDrop",function () {

  return {
    restrict: "A",
    link: function (scope, element, attrs) {

      // var expression = attrs.imageDrop;
      // var accesor = $parse(expression);

      var onDragEnter = function (e) {
        e.preventDefault();
        element.addClass("selected");
      };

      var onDragLeave = function (e) {
        e.preventDefault();
        element.removeClass("selected");
      };

      var onDragOver = function (e) {
        e.preventDefault();
        element.addClass("selected");
      };

      var onDragEnd = function (e) {
        e.preventDefault();
        element.removeClass("selected");
      };

      // var placeImage = function (imageData) {
      //   accesor.assign(scope, imageData);
      // };

      var resampleImage = function (imageData) {
        return resampler.resample(imageData, element.width(),element.height(), scope);
      };

      var loadFile = function (file) {
        event.preventDefault();
        function create_pupload_progress(){
          return function(event){
            element.css({
              width:Math.round(event.loaded*100/event.total)+'%'
            });
          }
        }

        function create_pupload_done(){
          return function(event){
            element.css({
              width:'100%'
            });
          }
        }

        var src = '';
        if(window.webkitURL){
          src = window.webkitURL.createObjectURL(file);
        }else{
          src = window.URL.createObjectURL(file);
        }
        var xhr = new XMLHttpRequest();
        var upload = xhr.upload;
        upload.onprogress = create_pupload_progress();
        upload.onload = create_pupload_done();
        xhr.open("POST","/project/psychological/v2/uploadImg?name="+file.name);
        xhr.overrideMimeType("application/octet-stream");
        xhr.send(file);

      };


      element.bind("dragover", onDragOver)
        .bind("dragleave", onDragLeave)
        .bind("dragenter", onDragEnter)
        .bind("drop", function (e) {
          onDragEnd(e);
          loadFile(e.originalEvent.dataTransfer.files[0]);
      });

      // scope.$watch(expression, function () {
      //   element.attr("src", accesor(scope));
      // });
    }
  };
});

angular.module('psychological.directives',[])

.directive("imagematerial",['$http',function($http){

  return {
    restrict:"E",
    scope:{
      stage:'@stage',
      type:'@type'
    },
    replace:true,
    templateUrl:'/templates/psychological/image_material.html',
    link:function(scope, element, attr){
      scope.array = [];
      scope.is_creating = false;
      scope.upImg = '';
      scope.downImg = '';

      scope.creating = function(){
        scope.is_creating = true;
      };

      scope.isCreating = function(){
        return scope.is_creating;
      };

      scope.cancelCreating = function(){
        scope.is_creating = false;
      };

      scope.getPairs = function(){
        $http.get('/project/psychological/v2/getpairs?type='+scope.type+'&stage='+scope.stage).success(function(data){
          scope.array = data.pairs;
        });
      };

      scope.delete = function(item){
        $http.delete('/project/psychological/v2/pairs/'+item._id)
          .success(function(data){
            scope.getPairs();
          });
      };

      scope.submit = function(){
        if(scope.upImg=='' || scope.downImg==''){
          alert('请添加图片');
          return false;
        }
        $http.post('/project/psychological/v2/addpairs',{
          upImg: scope.upImg,
          downImg: scope.downImg,
          letter: scope.$$childTail.letter,
          type: parseInt(scope.type),
          positivePosition: scope.$$childTail.position,
          stage: parseInt(scope.stage),
          sequence: scope.array.length+1
        }).success(function(data){
          if(data.success){
            scope.is_creating = false;
            scope.getPairs();
          }else{
            alert('添加失败');
          }
        });
      };

      scope.getPairs();
    }
  }
}])

.directive("textmaterial",['$http',function($http){

  return {
    restrict: "E",
    scope:{
      stage:'@stage',
      type:'@type'
    },
    replace:true,
    templateUrl:'/templates/psychological/text_material.html',
    link:function(scope, element, attrs){
      scope.materials = [];
      scope.is_creating = false;
      scope.nword = '';
      scope.pword = '';
      scope.sentence = '';

      scope.creating = function(){
        scope.is_creating = true;
      };

      scope.isCreating = function(){
        return scope.is_creating;
      };

      scope.cancelCreating = function(){
        scope.is_creating = false;
      };

      scope.getMaterials = function(){
        $http.get('/project/psychological/v2/console/getSentences?type='+scope.type+'&stage='+scope.stage).success(function(data){
          scope.materials = data.sentences;
        });
      };

      scope.delete = function(item){
        if(confirm('确定要删除？')){
          $http.delete('/project/psychological/v2/sentences/'+item._id)
            .success(function(data){
              scope.getMaterials();
            });
        }
      };

      scope.submit = function(){
        if(scope.pword==''){
          alert('请输入积极词');
          return false;
        }
        if(scope.nword==''){
          alert('请输入消极词');
          return false;
        }
        if(scope.sentence==''){
          alert('请输入句子');
          return false;
        }
        $http.post('/project/psychological/v2/console/addtext',{
          sentence: scope.sentence,
          nword: scope.nword,
          pword: scope.pword,
          stage: parseInt(scope.stage),
          sequence: scope.materials.length+1,
          type: parseInt(scope.type)
        }).success(function(data){
          if(data.success){
            scope.is_creating = false;
            scope.getMaterials();
            scope.nword = '';
            scope.pword = '';
            scope.sentence = '';
          }else{
            alert('添加失败');
          }
        });
      };

      scope.getMaterials();
    }
  }
}])

.directive("subjects",['$http',function($http){

  return {
    restrict:'E',
    scope:{
      type:'@type'
    },
    replace:true,
    templateUrl:'/templates/psychological/subjects.html',
    link:function(scope, element, attr){
      scope.isAdding = false;
      scope.subjects = [];
      scope.name = '';

      scope.getSubjects = function(){
        $http.get('/project/psychological/v2/console/getsubjects?type='+scope.type).success(function(data){
          scope.subjects = data.subjects;
        });
      };
      scope.getSubjects();

      scope.addSubject = function(){
        $http.post('/project/psychological/console/addsubject',{type:parseInt(scope.type),name:scope.name}).success(function(data){
          if(data.success){
            scope.isAdding = false;
            scope.getSubjects();
            scope.name = '';
          }else{
            alert('添加被试失败');
          }
        });
      }

      scope.add = function(){
        return scope.isAdding = true;
      }

      scope.cancelAdding = function(){
        return scope.isAdding = false;
      }

      scope.deleteSubject = function(subject){
        if(confirm('您要删除被试吗？')){
          $http.delete('/project/psychological/console/delsuject'+subject._id)
            .success(function(data){
              scope.getSubjects();
            });
        }
      }
    }
  }
}])

.directive("imagedrop",function () {

  return {
    restrict: "A",
    link: function (scope, element, attrs) {
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

      var loadFile = function (file) {
        event.preventDefault();
        function create_pupload_progress(){
          return function(event){
            element.find('i').css({
              width:Math.round(event.loaded*100/event.total)+'%'
            });
          }
        }

        function create_pupload_done(){
          return function(event){
            element.find('i').css({
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
        element.find('h1').remove();
        if(element.hasClass('upimg')){
          scope.$parent.upImg = '/upload/img/' + file.name;
          element.prepend('<p>上图</p>');
        }else if(element.hasClass('downimg')){
          scope.$parent.downImg = '/upload/img/' + file.name;
          element.prepend('<p>下图</p>');
        }
        element.prepend('<p>'+file.name+'</p>');
        element.prepend('<img src="'+src+'" />');
        element.append('<i></i>');
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
          loadFile(e.dataTransfer.files[0]);
      });
    }
  };
});

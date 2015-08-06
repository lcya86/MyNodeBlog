angular.module('psychological.directives',[])

.directive("textmaterial",function(){

  return {
    restrict: "E",
    scope:{
      stage:'@stage',
      type:'@type'
    },
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
        $http.get('/project/psychological/v2/getSentences?type='+scope.type+'&stage='+scope.stage).success(function(data){
          scope.materials = data.sentences;
        });
      };

      scope.delete = function(item){
        $http.delete('/project/psychological/v2/sentences/'+item._id)
          .success(function(data){
            scope.getMaterials();
          });
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
          stage: scope.stage,
          sequence: scope.materials.length+1,
          type: scope.type
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
})

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

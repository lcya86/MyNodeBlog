angular.module('psychological.directives',[])


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

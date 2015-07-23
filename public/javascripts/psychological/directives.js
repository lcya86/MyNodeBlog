angular.module('psychological.directives',[])


.directive("imagedrop",function () {

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

      var placeImage = function (imageData) {
        accesor.assign(scope, imageData);
      };

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
          console.log(e);
          loadFile(e.originalEvent.dataTransfer.files[0]);
      });

      // scope.$watch(expression, function () {
      //   element.attr("src", accesor(scope));
      // });
    }
  };
});

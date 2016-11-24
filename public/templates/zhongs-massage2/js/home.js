semantic.home = {};

// ready event
semantic.home.ready = function() {


  // google map
  var map;
  var service;
  var infowindow;
  var markers = [];

  function initialize() {
    var pyrmont = new google.maps.LatLng(-37.828195, 144.962355);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        scrollwheel:false,
        zoom: 9
      });

    var requests = [];
    $.each($('.ui.shops .header'),function(index,item){
      requests.push($(item).text());
    });


    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    $.each(requests,function(index,item){
      service.textSearch({
        query:item
      },callback);
    });

    $('.ui.shops .header').click(function(event){
      deleteMarkers();
      service.textSearch({
        query:$(event.target).text()
      },callback);

    });
  }

  function createMarker(place){
    var marker = new google.maps.Marker({
        map:map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });
    markers.push(marker);
    map.setCenter(marker.position);
    google.maps.event.addListener(marker, 'click', function(event) {
      map.setCenter(event.latLng);
      infowindow.setContent(place.name);
      infowindow.open(map, this);

    });
  }
  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }
  initialize();




  var
    $themeDropdown = $('.theme.dropdown'),
    $header        = $('.masthead'),
    $ui            = $header.find('h1 b'),
    $phrase        = $header.find('h1 span'),
    $download      = $header.find('.download'),
    $library       = $header.find('.library'),
    $cursor        = $header.find('.typed-cursor'),
    $version       = $header.find('.version'),
    $themeButton   = $('.theming .source.button'),
    $themeGrid     = $('.theming .source.grid'),

    handler
  ;

  handler = {
    introduction: function() {
      // zoom out
      $header
        .removeClass('zoomed')
      ;
    },
    changeLogo: function() {
      var
        $logo = $('.following .logo'),
        $nextSide = $logo.find('.'+ $(this).data('site') +'.side'),
        directions = [
          'up',
          'left',
          'down',
          'right'
        ],
        direction = directions[Math.floor(Math.random() * directions.length)]
      ;
      if($nextSide.length > 0) {
        clearTimeout(handler.timer);
        handler.timer = setTimeout(function() {
          $logo
            .shape('set next side', $nextSide)
            .shape('flip ' +  direction)
          ;
        }, 50);
      }
    },
    returnLogo: function() {
      var
        $logo = $('.following .logo'),
        $nextSide = $logo.find('.ui.side')
      ;
      clearTimeout(handler.timer);
      handler.timer = setTimeout(function() {
        $logo
          .shape('set next side', $nextSide)
          .shape('flip over')
        ;
      }, 500);

    }
  };

  // intro
  handler.introduction();

  if($(window).width() > 600) {
    $('body')
      .visibility({
        offset         : -10,
        observeChanges : false,
        once           : false,
        continuous     : false,
        onTopPassed: function() {
          requestAnimationFrame(function() {
            $('.following.bar')
              .addClass('light fixed')
              .find('.menu')
                .removeClass('inverted')
            ;
            $('.following .additional.item')
              .transition('scale in', 750)
            ;
          });
        },
        onTopPassedReverse: function() {
          requestAnimationFrame(function() {
            $('.following.bar')
              .removeClass('light fixed')
              .find('.menu')
                .addClass('inverted')
                .find('.additional.item')
                  .transition('hide')
            ;
          });
        }
      })
    ;
  }
  $('.additional.item')
    .popup({
      delay: {
        show: 200,
        hide: 50
      },
      position: 'bottom center'
    })
  ;


  $('.ui.sidebar')
    .sidebar('setting', {
      transition: 'overlay'
    })
  ;

};


// attach ready event
$(document)
  .ready(semantic.home.ready)
;

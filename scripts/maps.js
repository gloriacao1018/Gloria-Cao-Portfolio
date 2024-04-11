function initMap() {

    // Specify features and elements to define styles.
    var styleArray = [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
                      {
                          "saturation": 36
                      },
                      {
                          "color": "#ffffff"
                      },
                      {
                          "lightness": 40
                      }
                  ]
              },
              {
                  "featureType": "all",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                      {
                          "visibility": "off"
                      },
                      {
                          "color": "#395442"
                      },
                      {
                          "lightness": 16
                      },
                      {
                          "weight": "3"
                      }
                  ]
              },
              {
                  "featureType": "all",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#395442"
                      },
                      {
                          "lightness": 20
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#395442"
                      },
                      {
                          "lightness": 17
                      },
                      {
                          "weight": 1.2
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#395442"
                      },
                      {
                          "lightness": 0
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#395442"
                      },
                      {
                          "lightness": 21
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ac9377"
                      },
                      {
                          "lightness": 17
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#ac9377"
                      },
                      {
                          "lightness": 29
                      },
                      {
                          "weight": 0.2
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#ac9377"
                      },
                      {
                          "lightness": 18
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#ac9377"
                      },
                      {
                          "lightness": 16
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#ac9377"
                      },
                      {
                          "lightness": 19
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#f2e3b4"
                      },
                      {
                          "lightness": 17
                      }
                  ]
              }
          ];
  
    // Create a map object and specify the DOM element for display.
      var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 46.341587, lng: -72.538803},
          scrollwheel: false,
          // Apply the map style array to the map.
          styles: styleArray,
          zoom: 14,
          draggable: false
  
      });
      var image = 'img/pin.svg';
      var beachMarker = new google.maps.Marker({
          position: {lat: 46.3413, lng: -72.538803},
          map: map,
          icon: image
      });
  }
  
  initMap();
  
  
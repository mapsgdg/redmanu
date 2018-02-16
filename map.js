 function initMap() {
        var locations = [
          ['Unidad 156', 9.91763, -84.07053 ],
          ['Unidad 157', 9.9133, -84.06901 ],
          ['Unidad 158', 9.89975, -84.06502 ],
          ['Unidad 159', 9.91770, -86.06780 ],
        ];
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 9.91770, lng:  -84.07053} 
        });
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        var marker, i;
        var icon = {
          url: "bus1.png",
          scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
        };

        // add some content to userLi1 
        var userLi1 = '<IMG BORDER="0.2" WIDTH="315px" HEIGHT="185" ALIGN="center" SRC="ID1.png">';
        
        service.getDetails({
          placeId: 'ChIJw2bWqhPjoI8RPxRyJTsHHl4'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (i = 0; i < locations.length; i++) {  
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: icon,
                map: map
              });
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent('<div><strong>' + place.name + '<br>' +
                  place.formatted_address + '</div>' + '<div id="mySlider"><ul>' + userLi1 + '</ul></div>');
                  infowindow.open(map, marker);
                }
              })(marker, i));
            }
          }
        });
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var start = {lat: 9.91763, lng: -84.07053};
        var end = {lat: 9.89975, lng: -84.06502};
        directionsService.route({
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
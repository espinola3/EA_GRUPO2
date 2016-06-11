angular.module('ControllersModule')
    .controller(
        'MapCtrl',
        ['GoogleMapsService', '$scope', function (GoogleMapsService, $scope) {
            $scope.map     = GoogleMapsService.init('map_container', 41.3098385, 1.9972236);
            $scope.address = '';


            /*marker = new google.maps.Marker({
                position: latlng,
                map: map
            }); //end marker

//Add listener
            google.maps.event.addListener(marker, "click", function (event) {
                var latitude = marker.latLng.lat();
                var longitude = latLng.lng();
                alert(this.position);
            });*/


            $scope.gameMap = function () {


                var map = new google.maps.Map(document.getElementById('map_container'), {
                    center: {lat: 41.3990883450641, lng: 2.1805070206817323},
                    zoom  : 15
                });

                var triangleCoords = [
                    {lat: 41.40288906367612, lng: 2.1742628380950624},
                    {lat: 41.404015698438805, lng: 2.173597650259369},
                    {lat: 41.40358114163036, lng: 2.175421552389496}
                ];

                var bermudaTriangle = new google.maps.Polygon({paths: triangleCoords});

                google.maps.event.addListener(map, 'click', function (e) {
                    var resultColor =
                            google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle) ?
                                'red' :
                                'blue';

                    new google.maps.Marker({
                        position: e.latLng,
                        map     : map,
                        icon    : {
                            path        : google.maps.SymbolPath.CIRCLE,
                            fillColor   : resultColor,
                            fillOpacity : .2,
                            strokeColor : 'white',
                            strokeWeight: .5,
                            scale       : 10
                        }
                    });
                });

            };


            $scope.addCurrentLocation = function () {
                GoogleMapsService.createByCurrentLocation(function (markerData) {
                    markerData.options.labelContent = 'Esta es su ubicacion';
                    var marker                      = new google.maps.Marker(markerData);
                    marker.setMap($scope.map);
                    //$scope.map.markers.push(marker);
                    console.log("map", $scope.map);
                    refresh(markerData);
                });
            };
            // añadir dirección actual
            $scope.addAddress         = function () {
                var address = $scope.address;
                if (address !== '') {
                    GoogleMapsService.createByAddress(address, function (markerData) {
                        markerData.options.labelContent = 'Esta es su ubicacion';
                        var marker                      = new google.maps.Marker(markerData);
                        marker.setMap($scope.map);
                        //$scope.map.markers.push(marker);  
                        console.log("map", $scope.map);
                        refresh(markerData);
                    });
                }
            };

            $scope.addAddress2 = function (points) {
                var address = points[0].split(';');
                for (i = 0; i < address.length; i++) {
                    address[i];
                    console.log('ESTO ES ESO', address[i]);
                    console.log('ESTO ES ESO', address.length);
                    if (address !== '') {
                        GoogleMapsService.createByAddress(address[i], function (markerData) {
                            markerData.options.labelContent = 'Esta es su ubicacion';
                            var marker                      = new google.maps.Marker(markerData);
                            marker.setMap($scope.map);
                            //$scope.map.markers.push(marker);
                            console.log("map", $scope.map);
                            refresh(markerData);
                        });
                    }
                    ;

                }
            };


            function refresh(marker) {
                console.log(marker);
                $scope.map.setCenter({
                    lat: marker.position.lat,
                    lng: marker.position.lng
                });
            }

            $scope.drawRoutes = function (points) {
                var parsedPoints = points.split(';').map(function (coords) {
                    var parsedCoords = coords.split(',');
                    return {lat:parseFloat(parsedCoords[0]), lng: parseFloat(parsedCoords[1])}
                });
                $scope.markers = [];
                GoogleMapsService.drawRoutes($scope.map, parsedPoints, $scope.markers);

            }

        }]);


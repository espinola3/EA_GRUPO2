angular.module('ControllersModule')
    .controller(
        'MapCtrl',
        ['GoogleMapsService', '$scope', function (GoogleMapsService, $scope) {
            $scope.map     = GoogleMapsService.init('map_container', 41.3098385, 1.9972236);
            $scope.address = '';
            var stepDisplay = new google.maps.InfoWindow;

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

            }


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

            $scope.lineas = function (points) {
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var directionsService = new google.maps.DirectionsService;
                var map               = new google.maps.Map(document.getElementById('map_container'), {
                    zoom  : 14,
                    center: {lat: 41.3990883450641, lng: 2.1805070206817323}
                });
                directionsDisplay.setMap(map);

                calculateAndDisplayRoute(points, directionsService, directionsDisplay);
                document.getElementById('mode').addEventListener('change', function () {
                    calculateAndDisplayRoute(points, directionsService, directionsDisplay);
                });



                function calculateAndDisplayRoute(points, directionsService, directionsDisplay) {
                    var address = points[0].split(';');

                    for (var i = 0; i < address.length; i++) {
                        if ((i + 1) < address.length) {
                            var currentAddress = address[i].split(',');
                            var nextAddress    = address[i+1].split(',');

                            console.log('CURRENT', parseFloat(currentAddress[0]));
                            console.log('NEXT', nextAddress);

                            directionsService.route({
                                origin     : {lat: parseFloat(currentAddress[0]), lng: parseFloat(currentAddress[1])},  // Haight.
                                destination: {lat: parseFloat(nextAddress[0]), lng: parseFloat(nextAddress[1])},  // Ocean Beach.
                                // Note that Javascript allows us to access the constant
                                // using square brackets and a string value as its
                                // "property."
                                travelMode : google.maps.TravelMode['WALKING']
                            }, function (response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                    showSteps(response, points, stepDisplay, map);
                                } else {
                                    window.alert('Directions request failed due to ' + status);
                                }
                            });
                        }
                    }
                }

                function showSteps(directionResult, markerArray, stepDisplay, map) {
                    // For each step, place a marker, and add the text to the marker's infowindow.
                    // Also attach the marker to an array so we can keep track of it and remove it
                    // when calculating new routes.
                    var myRoute = directionResult.routes[0].legs[0];
                    for (var i = 0; i < myRoute.steps.length; i++) {
                        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;

                        marker.setMap(map);
                        marker.setPosition(myRoute.steps[i].start_location);
                        attachInstructionText(
                            stepDisplay, marker, myRoute.steps[i].instructions, map);
                    }
                }
            }

        }]);


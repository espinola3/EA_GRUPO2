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
                    zoom  : 16,
                    options: {
                        scrollwheel: false
                    }
                });

                var PlazaCatalunya = [
                    {lat: 41.38741576570434, lng: 2.168784872213796},
                    {lat: 41.38787457856547, lng: 2.170029417196706},
                    {lat: 41.38698109790202, lng: 2.171155944982961},
                    {lat: 41.38587831655046, lng: 2.170083061377004}
                ];
                var ParcCiutadella = [
                    {lat: 41.388160541475585, lng: 2.182609872549408},
                    {lat: 41.3913157844871, lng: 2.186858491628998},
                    {lat: 41.38722681775338, lng: 2.1924374863799745},
                    {lat: 41.3844577651107, lng: 2.1872447297271425}
                ];

                var Aquarium = [
                    {lat: 41.37586007122854, lng: 2.1772025391753846},
                    {lat: 41.38075477788284, lng: 2.1828244492705995},
                    {lat: 41.37866169182913, lng: 2.1890471741851503},
                    {lat: 41.370353085935676, lng: 2.1858714387115175}
                ];


                var PlazaCatalunya = new google.maps.Polygon({paths: PlazaCatalunya});
                var CiutadellaPark = new google.maps.Polygon({paths: ParcCiutadella});
                var Aquarium2 = new google.maps.Polygon({paths: Aquarium});

                GoogleMapsService.drawGames(map,PlazaCatalunya,'red', '#09F6DD');
                GoogleMapsService.drawGames(map,CiutadellaPark, 'red', '#D6D7D7');
                GoogleMapsService.drawGames(map,Aquarium2,'red', '#ADAFAF');

            };
            $scope.gameMap1 = function () {


                var map = new google.maps.Map(document.getElementById('map_container'), {
                    center: {lat: 41.3990883450641, lng: 2.1805070206817323},
                    zoom  : 16,
                    options: {
                        scrollwheel: false
                    }
                });

                var SagradaFamilia = [
                    {lat: 41.40358114163176, lng: 2.1732114121612245},
                    {lat: 41.404385874170146, lng: 2.17432721111142},
                    {lat: 41.40361333112483, lng: 2.1753571793731385},
                    {lat: 41.40267982935745, lng: 2.174198465078705}
                ];
                var CasaBatllo = [
                    {lat: 41.391149832063824, lng: 2.163654941525235},
                    {lat: 41.391978864975336, lng: 2.1647921981475493},
                    {lat: 41.39120617444147, lng: 2.165650505032315},
                    {lat: 41.39047371972714, lng: 2.1646098079345366}
                ];

                var ParkGuell = [
                    {lat: 41.41484883807698, lng: 2.1505272751160254},
                    {lat: 41.41619250278038, lng: 2.1533167724915137},
                    {lat: 41.41440630768962, lng: 2.1551514034577},
                    {lat: 41.41187175738832, lng: 2.151932752639829}
                ];


                var sagradaFamili = new google.maps.Polygon({paths: SagradaFamilia});
                var CasaBatllo  = new google.maps.Polygon({paths: CasaBatllo});
                var ParkGuell = new google.maps.Polygon({paths: ParkGuell});

                GoogleMapsService.drawGames(map,sagradaFamili,'red', '#09F6DD');
                GoogleMapsService.drawGames(map,CasaBatllo, 'red', '#D6D7D7');
                GoogleMapsService.drawGames(map,ParkGuell,'red', '#ADAFAF');

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


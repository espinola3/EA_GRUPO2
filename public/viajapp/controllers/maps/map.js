angular.module('ControllersModule')
    .controller(
        'MapCtrl',
        ['MarkerCreatorService', '$scope', function (MarkerCreatorService, $scope) {
    console.log("AMPS - entra");
    MarkerCreatorService.createByCoords(40.454018, -3.509205, function (marker) {
        marker.options.labelContent = 'Localizacion';
        $scope.autentiaMarker = marker;
    });

    $scope.address = '';

    $scope.map = {
        center: {
            latitude: $scope.autentiaMarker.latitude,
            longitude: $scope.autentiaMarker.longitude
        },
        zoom: 12,
        markers: [],
        control: {},
        options: {
            scrollwheel: false
        }
    };

    $scope.map.markers.push($scope.autentiaMarker);
// añadir localización actual
    $scope.addCurrentLocation = function () {
        MarkerCreatorService.createByCurrentLocation(function (marker) {
            marker.options.labelContent = 'Esta es su ubicacion';
            $scope.map.markers.push(marker);
            refresh(marker);
        });
    };
    // añadir dirección actual
    $scope.addAddress = function() {
        var address = $scope.address;
        if (address !== '') {
            MarkerCreatorService.createByAddress(address, function(marker) {
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        }
    };

    function refresh(marker) {
        $scope.map.control.refresh({latitude: marker.latitude,
            longitude: marker.longitude});
    }

}]);


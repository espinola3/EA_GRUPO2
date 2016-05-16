angular.module('ServicesModule').factory('GoogleMapsService', function () {

    var markerId = 0;

    function init(container, latitude,longitude) {
        return new google.maps.Map(document.getElementById(container), {
            center: {lat: latitude, lng: longitude},
            zoom: 15,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        });
    }

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'
            },
            position: {lat:latitude, lng:longitude}
        };
        return marker;
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    // crea una localización mediante Latitud y longitud

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }
    // crea una localización mediante dirección
    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }
    // crea una localización mediante el  boton de buscar localización actual
    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }

    function currentCoords(onSuccess){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                onSuccess(position.coords);
            });
        } else {
            onSuccess({longitude:0, latitude:0});
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation,
        init: init,
        currentsCoords: currentCoords
    };

});
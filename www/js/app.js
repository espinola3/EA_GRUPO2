// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic','ngRoute'])

app.controller('MainController', ['$scope','$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {
    $scope.newPersona = {};
    $scope.personas = {};

    $scope.newRuta  = {};
    $scope.rutas    = {};

    $scope.newTypeRuta  = {};
    $scope.typerutas    = {};
	$scope.testy = 5;
	if ($rootsScope= false)
	{
	$rootScope.log = false;
	}
	//$scope.logged = sessionStorage.log;
	$scope.loginForm = {};
    $scope.passerror = "";
    $scope.selected = false;
	
	dir = "192.168.1.12:5885";
		
	
//-----------------------------------------Usuarios-----------------------------------------
    // Obtenemos todos los datos de la base de datos
	
	
    $http.get('http://'+ dir +'/users').success(function(data) {
        console.log(data);
            $scope.personas = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
		
    $scope.isLoggedIn = function() {
		
                //alert(sessionStorage.log + '  ' + $scope.logged);
                $rootScope.log=true;
				
            };	
			
    $scope.Log = function() {
	
				$rootScope.log=false;

            };	
	
	$scope.login = function() {
	   
                $http.post('http://'+ dir +'/user/login',
                    {username: $scope.loginForm.username, password: $scope.loginForm.password})
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            //usuario={username:username};
							$rootScope.log = true;
							$location.url('/register');
                        } else {
                            $rootScope.log = false;
                        }
                    })
                    .error(function (data) {
                        $rootScope.log = false;
                    });                

            };

	
    // Función para registrar a una persona
    $scope.registrarPersona = function() {
        if ($scope.passerror == "La contraseña y la comprobación coinciden") {
            $http.post('http://'+ dir + '/user', $scope.newPersona)
                .success(function (data) {
                    if (data != false) {
                        $scope.newPersona = {}; // Borramos los datos del formulario
                        $scope.personas = data;
                        $scope.passerror = ""
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
        else 
            alert ("Cuidado! Contraseña y comprobación no coinciden!")
    };


    // Función para editar los datos de una persona
    $scope.modificarPersona = function(newPersona) {
        $http.put('http://'+ dir +'/user/update', $scope.newPersona)
            .success(function(data) {
                $scope.newPersona = {}; // Borramos los datos del formulario
                $scope.personas = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto persona conocido su id
    $scope.borrarPersona = function(name) {
        if (confirm ("Do you want to delete the user? "))

        {
        console.log("borrar persona " + name);
        $http.delete('http://'+ dir +'/user/delete/' + name)
            .success(function(data) {
                $scope.newPersona = {};
                $scope.personas = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });}
    };
        
        $scope.verificar = function(pass, pass2)
        {
            if (pass != pass2)
                $scope.passerror = "La contraseña y la comprobación no coinciden"
                
            else {
                if ((pass == false) && (pass2 == false))
                {
                    $scope.passerror = ""
                }
                else
                    $scope.passerror = "La contraseña y la comprobación coinciden"
            }
        };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectPerson = function(persona) {
        $scope.newPersona = persona;
        $scope.selected = true;
        console.log($scope.newPersona, $scope.selected);
    };

//-----------------------------Rutas-----------------------------------------
/*
    // Obtenemos todos los datos de la base de datos de todas las rutas
    $http.get('http://localhost:3000/routes').success(function (data) {
            $scope.rutas = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
		
*/

        $scope.Mostrarportipo = function (tipo) {
        $http.get('http://' + dir +'/routesbytype/'+ tipo).success(function (data) {
                $scope.rutas = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };
        
    $scope.Mostrarporciudad = function (ciudad) {
            $http.get('http://'+ dir +'/routesbycity/'+ ciudad).success(function (data) {
                    $scope.rutas = data;
                console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        };

        // Obtenemos todos los datos de la base de datos de todos los tipos de rutas
    $http.get('http://'+ dir +'/typeroutes').success(function (data) {
            $scope.typerutas = data;
        console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });



    // Función para registrar una Ruta
    $scope.registrarRuta = function () {
        $http.post('http://'+ dir +'/route', $scope.newRuta)
            .success(function (data) {
                $scope.rutas   = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
		$http.post('http://'+ dir +'/typeroute', $scope.newRuta)
            .success(function (data) {
                $scope.newRuta = {}; // Borramos los datos del formulario
                $scope.typerutas   = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };



    // Función para editar los datos de una Ruta
    $scope.modificarRuta = function (newRuta) {
        $http.put('http://'+ dir +'/route/update', $scope.newRuta)
            .success(function (data) {
                $scope.newRuta  = {}; // Borramos los datos del formulario
                $scope.rutas    = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

// Función para inserta rutas en typos
    /*$scope.InsertarRuta = function () {
        
        $http.post('/route', $scope.newRuta)
            .success(function (data) {
                $scope.rutas = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });  
        
        $http.put('/typeroute/update', $scope.newRuta)
            .success(function (data) {
                console.log($scope.newRuta.name);
                $scope.newRuta = {}
                $scope.newTypeRuta  = {}; // Borramos los datos del formulario
                $scope.typerutas = data;
                $scope.selected = false;
                $scope.newRuta = {};
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
*/

    // Función que borra una Ruta conocido su el ID
    $scope.borrarRuta = function (name, res) {
        if (confirm ("¿Seguro que quieres eliminar? "))

        {
              $http.delete('http://'+ dir +'/route/delete/' + name)
                .success(function (data) {
                    $scope.newRuta  = {};
                    $scope.rutas    = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    };
        $scope.toggleCategory = function(subjects) {
            subjects.expanded = !subjects.expanded;
        };

    }]);
	
	app.controller('MapCtrl', function($scope, $ionicLoading) {
  
   
		
		console.log('Entra cibasdsadadsadaad');
		
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		
		
		$scope.map     = "map";

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        //$scope.map = map;
   
 
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'views/home.html',
	controller: 'MainController',
	restricted     : false
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
	controller: 'MainController',
	restricted     : false
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
	controller: 'MainController',
	restricted     : false
  })
  .state('register', {
    url: '/register',
    templateUrl: 'index.html',
	controller: 'MainController',
	restricted     : false
  })
  .state('rutas', {
    url: '/rutas',
    templateUrl: 'views/rutas.html',
	controller: 'MainController',
	restricted     : true
  })
  .state('nuevaruta', {
    url: '/nuevaruta',
    templateUrl: 'views/nuevaruta.html',
	controller: 'MainController',
	restricted     : true
  })
  .state('map', {
    url: '/mapa',
    templateUrl: 'views/mapa.html',
	controller: 'MapCtrl',
	restricted     : true
  })
  .state('contact', {
    url: '/contact',
    templateUrl: 'views/contact.html',
	controller: 'MainController',
	restricted     : false
  })
  .state('ciudad', {
    url: '/ciudad',
    templateUrl: 'views/ciuadad.html',
	controller: 'MainController',
	restricted     : true
  })
 
  //$urlRouterProvider.otherwise("register");
});
  

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


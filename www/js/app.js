
var app = angular.module('starter', ['ionic','ngRoute'])


app.factory('MyService', function() {
         //return {
                 var data = {
					 'name' : '',
					 'city' : '',
					 'time' : '',
					 'interest' : '',
					 'truth' : false
				 };
				 
				 return{
					 name: data.name,
					 city: data.city,
					 time: data.time,
					 interest: data.interest,
					 truth: data.truth
				 };
				
	});


app.controller('MainController', ['$scope','$http', '$location', '$rootScope', 'MyService', '$ionicPopover', function($scope, $http, $location, $rootScope, MyService, $ionicPopover) {
    $scope.newPersona = {};
    $scope.personas = {};

    $scope.newRuta  = {};
    $scope.rutas    = {};
	$scope.registerPuntos = {};

    $scope.newTypeRuta  = {};
    $scope.typerutas    = {};
	$scope.testy = 5;
	
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
							$rootScope.user = $scope.loginForm.username;
							$location.url('/home');
                        } else {
                            $rootScope.log = false;
                        }
                    })
                    .error(function (data) {
                        $rootScope.log = false;
                    });                

            };
			
			$scope.logout = function() {
	   
							$rootScope.log = false;
							$rootScope.user = "";
							$location.url('/register');

            };

	$ionicPopover.fromTemplateUrl("templates/popover.html", {
    scope: $scope,
    }).then(function(popover) {
    $scope.popover = popover;
    });	

    $ionicPopover.fromTemplateUrl("templates/popover1.html", {
    scope: $scope,
    }).then(function(popover1) {
    $scope.popover1 = popover1;
    });		
	
	$scope.openPopover = function($event) {
      $scope.popover.show($event);
    }; 
   
    $scope.openPopover1 = function($event) {
      $scope.popover1.show($event);
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
	
	$scope.Register = function() {
        if ($scope.passerror == "La contraseña y la comprobación coinciden") {
            $http.post('http://'+ dir + '/user/register', {username: $scope.newPersona.username, password: $scope.newPersona.password, city: $scope.newPersona.city, email: $scope.newPersona.email ,pic: $scope.newPersona.pic})
                .success(function (data, status) {
                    if (data != false) {
                        $scope.newPersona = {}; // Borramos los datos del formulario
                        $scope.personas = data;
                        $scope.passerror = "";
						$location.url('/login');
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
        else 
            alert ("Cuidado! Contraseña y comprobación no coinciden!")
    };
	

	
	$scope.showDetail  = function ()
                {

                    $http.get('http://'+ dir +'/users/userdetail/' + $rootScope.user).success(function (data) {
                            $scope.persona = data;
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });

                };
				
	
	$scope.sumarPuntos = function (username) {
                    $http.get('http://'+ dir +'/users/userdetail/' + username).success(function (data) {
                        
                            puntos = data[0].numrutas;
                            puntos = puntos + 1;
                            $scope.registerPuntos.username = username;
                            $scope.registerPuntos.numrutas = puntos;

                        console.log('detalles',  $scope.registerPuntos);

                            $http.put('http://'+ dir +'/user/updatepuntos/'+ username, $scope.registerPuntos)
                                .success(function (data) {
                                    console.log('DATA', data);
                                    $scope.selected   = false
                                })
                                .error(function (data) {
                                    console.log('Error: ' + data);
                                });

                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                    

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
				$scope.sumarPuntos($rootScope.user);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
		$http.post('http://'+ dir +'/typeroute', $scope.newRuta)
            .success(function (data) {
                //$scope.newRuta = {}; // Borramos los datos del formulario
                $scope.typerutas   = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

	
	$scope.Send = function(){
		MyService.truth = true;
		$location.url('/map');
	};
        $scope.toggleCategory = function(subjects) {
            subjects.expanded = !subjects.expanded;
			$scope.yeah=subjects.name;
			MyService.name = subjects.name;
		    MyService.city = subjects.city;
		    MyService.time = subjects.time;
		    MyService.interest = subjects.interest;
        };

    }]);
	
	
	app.controller('MapCtrl', function($scope, MyService) {
		
        //alert(MyService.name);
		var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
		
        var placenum = 0;
				
		
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		
		var mapOptions_container = {
            center: {lat: 41.3990883450641, lng: 2.1805070206817323},
            zoom: 16,
			options:{
				scrollwheel: false
			}
        };
		
		var mapOptions_container1 = {
            center: {lat: 41.3990883450641, lng: 2.1805070206817323},
            zoom: 16,
			options:{
				scrollwheel: false
			}
        };
 
		var intentos = 0;
		var mapa = document.getElementById("map");
        if (mapa)
        var map = new google.maps.Map(mapa, mapOptions);
	    var map_container = document.getElementById("map_container");
        if (map_container)	
        var map = new google.maps.Map(map_container, mapOptions_container);
	    var map_container1 = document.getElementById("map_container1");
        if (map_container1)	
        var map = new google.maps.Map(map_container1, mapOptions_container1);
		
		$scope.map = map;
        
		$scope.drawGames = function (map, triangle, uno, dos, e){
			var resultColor =
                    google.maps.geometry.poly.containsLocation(e.latLng, triangle) ?
                        uno :
                        dos;
						
			if (resultColor == uno)
			{
            alert("lo has encontrado!!");			
			}
			
            marky = new google.maps.Marker({
                position: e.latLng,
                setMap     : map,
                icon    : {
                    path        : google.maps.SymbolPath.CIRCLE,
                    fillColor   : resultColor,
                    fillOpacity : 0.50,
                    strokeColor : 'black',
                    strokeWeight: .75,
                    scale       : 10
                }
            });
        
        };
		
		$scope.gameMap = function() {
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

				google.maps.event.addListener(map, 'click', function (e) {
                $scope.drawGames(map_container,PlazaCatalunya,'red', '#09F6DD', e);
                $scope.drawGames(map_container,CiutadellaPark, 'red', '#D6D7D7', e);
                $scope.drawGames(map_container,Aquarium2,'red', '#ADAFAF', e);
				});
		};
		
		$scope.gameMap1 = function() {
			
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

				google.maps.event.addListener(map, 'click', function (e) {
                $scope.drawGames(map_container1,sagradaFamili,'red', '#09F6DD', e);
                $scope.drawGames(map_container1,CasaBatllo, 'red', '#D6D7D7', e);
                $scope.drawGames(map_container1,ParkGuell,'red', '#ADAFAF', e);
				});
		};
		
		$scope.Locate = function () {
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
		};
		
		$scope.address = {};
		
		$scope.addAddress = function () {
                if ($scope.address.add !== '') {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address' : $scope.address.add}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                    var firstAddress = results[0];
                    var latitude = firstAddress.geometry.location.lat();
                    var longitude = firstAddress.geometry.location.lng();
					map.setCenter(new google.maps.LatLng(latitude, longitude));
					placenum++;
					var newLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: map,
                    title: "New Location " + placenum + ""
                    });
                    } else {
                      alert("Unknown address: " + $scope.address.add);
                    }
                    });
                }
            };
 
         $scope.refresh = function () {
			map = new google.maps.Map(document.getElementById("map"), mapOptions);
		 };
		
		if (!map_container && !map_container1)
		{
			$scope.name = MyService.name;
		    $scope.city = MyService.city;
		    $scope.time = MyService.time;
		    $scope.interest = MyService.interest;	
			var interests = MyService.interest.split(",");
			for (var i = 0, len = interests.length; i < len; i++) {
             $scope.address.add = interests[i];
			 $scope.addAddress();
            }
		
		}
		
   
 
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  
  $ionicConfigProvider.views.maxCache(0);
  
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'views/home.html',
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
  .state('perfil', {
    url: '/perfil',
    templateUrl: 'views/perfil.html',
	controller: 'MainController',
	restricted     : true
  })
  .state('top10', {
    url: '/top10',
    templateUrl: 'views/top10.html',
	controller: 'MainController',
	restricted     : true
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
    url: '/map',
	cache: false,
    templateUrl: 'views/mapa.html',
	controller: 'MapCtrl',
	restricted     : true
  })
  .state('game', {
    url: '/game',
	cache: false,
    templateUrl: 'views/game.html',
	controller: 'MapCtrl',
	restricted     : true
  })
  .state('game1', {
    url: '/game1',
	cache: false,
    templateUrl: 'views/game1.html',
	controller: 'MapCtrl',
	restricted     : true
  })
  .state('ciudad', {
    url: '/ciudad',
    templateUrl: 'views/ciuadad.html',
	controller: 'MainController',
	restricted     : true
  })
 
  
});
  

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


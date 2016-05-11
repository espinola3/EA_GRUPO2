var MainApp = angular.module('MainApp', ['ngRoute', 'ServicesModule', 'ControllersModule']);

MainApp.config(['$routeProvider', function ($routeProvider) {

    console.log("CONFIG");

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller : 'userInfo',
            restricted     : false
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller : 'loginController',
            restricted     : false
        })
        .when('/logout', {
            controller: 'logoutController',
            restricted     : true
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller : 'registerController',
            restricted     : false
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            restricted     : false
        })
        .when('/rutas', {
            templateUrl: 'views/rutas.html',
            restricted     : true
        })
        .when('/perfil1', {
            templateUrl: 'views/perfil1.html',
            restricted     : true
        })
        .when('/nuevaruta', {
            templateUrl: 'views/nuevaruta.html',
            restricted     : true
        })
        .when('/searchmapa', {
            templateUrl: 'views/searchmapa.html',
            restricted     : true
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            restricted     : false
        })
        .when('/ciudad', {
            templateUrl: 'views/ciuadad.html',
            restricted     : true
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

MainApp.run(["$location", "$rootScope", "$route", "AuthService", function($location, $rootScope, $route, AuthService) {

    $rootScope.$on('$locationChangeStart', function(evt, next, current) {

       var nextPath = $location.path(), nextRoute = $route.routes[nextPath];

        if (nextRoute && (nextRoute.restricted && !AuthService.isLoggedIn())) {

            $location.path("/");
        }
    });
}]);
angular.module('ControllersModule', ['ServicesModule']);


angular.module('ServicesModule', []);
angular.module('ControllersModule')
    .controller(
        'authController',
        ['$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {

                $scope.logout = function () {

                    // call logout from service
                    AuthService.logout()
                        .then(function () {
                            $location.path('/login');
                        });

                };
                
                $scope.isLoggedIn =function () {
                    return AuthService.isLoggedIn();                   
                    
                }

            }]);

angular.module('ControllersModule')
    .controller(
        'loginController',
        [
            '$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {
                console.log("LOGIN CONTROLLER - entra");
                $scope.login = function () {

                    // initial values
                    $scope.error    = false;
                    $scope.disabled = true;

                    // call login from service
                    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                        // handle success
                        .then(function () {
                            $location.url('/home');
                            $scope.disabled  = false;
                            $scope.loginForm = {};
                        })
                        // handle error
                        .catch(function () {
                            $scope.error        = true;
                            $scope.errorMessage = "Invalid username and/or password";
                            $scope.disabled     = false;
                            $scope.loginForm    = {};
                        });

                };

            }]);

angular.module('ControllersModule')
    .controller(
        'logoutController',
        ['$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {

                $scope.logout = function () {

                    // call logout from service
                    AuthService.logout()
                        .then(function () {
                            $location.path('/login');
                        });

                };

            }]);

angular.module('ControllersModule')
    .controller(
        'registerController',
        [
            '$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {
                console.log("REGISTER CONTROLLER - entra");

                $scope.register = function () {
                    // initial values
                    $scope.error    = false;
                    $scope.disabled = true;

                    // call register from service
                    AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.city, $scope.registerForm.email)
                        // handle success
                        .then(function () {
                            console.log("URL", $location.url());
                            $location.url('/login');
                            console.log("URL2", $location.url());

                            $scope.disabled     = false;
                            $scope.registerForm = {};
                        })
                        // handle error
                        .catch(function () {
                            $scope.error        = true;
                            $scope.errorMessage = "Something went wrong!";
                            $scope.disabled     = false;
                            $scope.registerForm = {};
                        });
                };
            }]);
angular.module('ControllersModule')
    .controller(
        'userInfo',
        ['$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {
                console.log("entro user_info");
                $scope.getUserStatus = function () {

                    // call logout from service
                    AuthService.getUserStatus()
                        .then(function () {
                            alert("");
                        });

                };

            }]);

angular.module('ControllersModule')
    .controller(
        'MainController',
        ['$scope', '$http', '$location',
            function ($scope, $http, $location) {
                $scope.registerForm = {};
                $scope.personas     = {};

                $scope.newRuta = {};
                $scope.rutas   = {};

                $scope.newTypeRuta = {};
                $scope.typerutas   = {};

                $scope.passerror = "";
                $scope.selected  = false;


                console.log("MAIN");

//-----------------------------------------Usuarios-----------------------------------------
                // Obtenemos todos los datos de la base de datos
                $http.get('/users').success(function (data) {
                        console.log(data);
                        $scope.personas = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });

                // Función para registrar a una persona
                $scope.registrarPersona = function () {
                    if ($scope.passerror == "La contraseña y la comprobación coinciden") {
                        $http.post('/user', $scope.newPersona)
                            .success(function (data) {
                                if (data != false) {
                                    $scope.newPersona = {}; // Borramos los datos del formulario
                                    $scope.personas   = data;
                                    $scope.passerror  = ""
                                }
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                    }
                    else
                        alert("Que no coinciden cansino !!!")
                };


                // Función para editar los datos de una persona
                $scope.modificarPersona = function (newPersona) {
                    $http.put('/user/update', $scope.newPersona)
                        .success(function (data) {
                            $scope.newPersona = {}; // Borramos los datos del formulario
                            $scope.personas   = data;
                            $scope.selected   = false;
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                };

                // Función que borra un objeto persona conocido su id
                $scope.borrarPersona = function (name) {
                    if (confirm("Do you want to delete the user? ")) {
                        console.log("borrar persona " + name);
                        $http.delete('/user/delete/' + name)
                            .success(function (data) {
                                $scope.newPersona = {};
                                $scope.personas   = data;
                                $scope.selected   = false;
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                    }
                };

                $scope.verificar = function (pass, pass2) {
                    if (pass != pass2)
                        $scope.passerror = "La contraseña y la comprobación no coinciden"

                    else {
                        if ((pass == false) && (pass2 == false)) {
                            $scope.passerror = ""
                        }
                        else
                            $scope.passerror = "La contraseña y la comprobación coinciden"
                    }
                };

                // Función para coger el objeto seleccionado en la tabla
                $scope.selectPerson = function (persona) {
                    $scope.newPersona = persona;
                    $scope.selected   = true;
                    console.log($scope.newPersona, $scope.selected);
                };

//-----------------------------Rutas-----------------------------------------


                // Obtenemos todos los datos de la base de datos de todas las rutas
                $http.get('/routes').success(function (data) {
                        $scope.rutas = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });


                $scope.Mostrarportipo = function (tipo) {
                    $http.get('/routesbytype/' + tipo).success(function (data) {
                            $scope.rutas = data;
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });

                };

                $scope.Mostrarporciudad = function (ciudad) {
                    $http.get('/routesbycity/' + ciudad).success(function (data) {
                            $scope.rutas = data;
                            console.log(data);
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });

                };

                // Obtenemos todos los datos de la base de datos de todos los tipos de rutas
                $http.get('/typeroutes').success(function (data) {
                        $scope.typerutas = data;
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });


                // Función para registrar una Ruta
                $scope.registrarRuta = function () {
                    $http.post('/route', $scope.newRuta)
                        .success(function (data) {
                            $scope.newRuta = {}; // Borramos los datos del formulario
                            $scope.rutas   = data;
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                };


                // Función para editar los datos de una Ruta
                $scope.modificarRuta = function (newRuta) {
                    $http.put('/route/update', $scope.newRuta)
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
                $scope.InsertarRuta = function () {

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
                            $scope.newRuta     = {}
                            $scope.newTypeRuta = {}; // Borramos los datos del formulario
                            $scope.typerutas   = data;
                            $scope.selected    = false;
                            $scope.newRuta     = {};
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                };


                // Función que borra una Ruta conocido su el ID
                $scope.borrarRuta     = function (name, res) {
                    if (confirm("¿Seguro que quieres eliminar? ")) {
                        $http.delete('/route/delete/' + name)
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
                $scope.toggleCategory = function (subjects) {
                    subjects.expanded = !subjects.expanded;
                };

                $scope.salta = function () {
                    console.log("SALTA");
                    $location.url("/register");
                }

            }]);
angular.module('ServicesModule').factory('AuthService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            // create user variable
            var user = false;

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });

            function isLoggedIn()
            {
                return user;
            }

            function getUserStatus() {
                console.log("ENTRA GET USER STATUS");

                return $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if(data.status){
                            console.log("Usuario "+ user);
                            user = true;
                        } else {
                            console.log("Usuario "+ user);

                            user = false;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                    });
            }
            function login(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function logout() {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    // handle success
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(name, password, city, email) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    {username: name, password: password, city:city, email:email})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

        }]);

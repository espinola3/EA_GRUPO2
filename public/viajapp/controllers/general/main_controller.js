angular.module('ControllersModule')
    .controller(
        'MainController',
        ['$scope', '$http', '$location',
            function ($scope, $http, $location) {

                $scope.registerForm = {};
                $scope.personas     = {};

                $scope.persona   = {};

                $scope.newRuta = {};
                $scope.rutas   = {};

                $scope.newTypeRuta = {};
                $scope.typerutas   = {};

                $scope.passerror = "";
                $scope.selected  = false;

                $scope.usrConnected ={username:"",isConnected:''}

                
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

                $scope.showDetail  = function (name)
                {

                    $http.get('/users/userdetail/' + name).success(function (data) {
                            $scope.persona = data;
                            console.log("DETALLES", data);
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });

                }

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

                $scope.modificarRuta2 = function (newRuta) {
                    $http.put('/route/updateroutes', $scope.newRuta)
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
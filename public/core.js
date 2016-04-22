
//var Persona = require('./modelo/user');
//var Rutas = require('./modelo/route');

angular.module('MainApp', [])
    .controller('MainController', ['$scope','$http', function($scope, $http) {
    $scope.newPersona = {};
    $scope.personas = {};
    $scope.newRuta  = {};
    $scope.rutas    = {};
    $scope.selected = false;

    // Obtenemos todos los datos de la base de datos
    $http.get('/users').success(function(data) {
        console.log(data);
            $scope.personas = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Función para registrar a una persona
    $scope.registrarPersona = function() {
        $http.post('/user', $scope.newPersona)
            .success(function(data) {
                $scope.newPersona = {}; // Borramos los datos del formulario
                $scope.personas = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // Función para editar los datos de una persona
    $scope.modificarPersona = function(newPersona) {
        $http.put('/user/update', $scope.newPersona)
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
        if (confirm ("you want to delete de route? "))

        {
        console.log("borrar persona " + name);
        $http.delete('/user/delete/' + name)
            .success(function(data) {
                $scope.newPersona = {};
                $scope.personas = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });}
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectPerson = function(persona) {
        $scope.newPersona = persona;
        $scope.selected = true;
        console.log($scope.newPersona, $scope.selected);
    };


    // Obtenemos todos los datos de la base de datos de todas las rutas
    $http.get('/routes').success(function (data) {
            $scope.rutas = data;
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

    // Función que borra una Ruta conocido su el ID
    $scope.borrarRuta = function (name, res) {
        if (confirm ("¿Seguro que quieres eliminar? "))

        {
              $http.delete('/route/delete/' + name)
                .success(function (data) {
                    $scope.newRuta  = {};
                    $scope.rutas    = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });}
    };
        $scope.toggleCategory = function(subjects) {
            subjects.expanded = !subjects.expanded;
        };

    }]);
var MainApp = angular.module('MainApp', ['ngRoute', 'ServicesModule', 'ControllersModule']);

MainApp.config(['$routeProvider', function ($routeProvider) {

    console.log("CONFIG");

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller : 'userInfo',
            access     : {restricted: true}
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller : 'loginController',
            access     : {restricted: false}
        })
        .when('/logout', {
            controller: 'logoutController',
            access    : {restricted: true}
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller : 'registerController',
            access     : {restricted: false}
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            access     : {restricted: true}
        })
        .when('/rutas', {
            templateUrl: 'views/rutas.html',
            access     : {restricted: false}
        })
        .when('/perfil1', {
            templateUrl: 'views/perfil1.html',
            access  : {restricted: false}
        })
        .when('/nuevaruta', {
            templateUrl: 'views/nuevaruta.html',
            access  : {restricted: false}
        })
        .when('/searchmapa', {
            templateUrl: 'views/searchmapa.html',
            access  : {restricted: false}
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            access  : {restricted: false}
        })
        .when('/ciudad', {
            templateUrl: 'views/ciuadad.html',
            access  : {restricted: false}
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

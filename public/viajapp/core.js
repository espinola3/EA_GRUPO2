var MainApp = angular.module('MainApp', ['ngRoute', 'ServicesModule', 'ControllersModule', 'ngModal']);

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
        .when('/login-fb', {
            templateUrl: 'views/login.html',
            controller : 'facebookLoginController',
            restricted     : false
        })
        .when('/logout', {
            controller: 'logoutController',
            restricted     : true
        })
        .when('/mapa', {
            templateUrl: 'views/mapa.html',
            controller : 'MapCtrl',
            restricted     : false
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
            controller : 'MapCtrl',
            restricted     : true
        })
        .when('/perfil1', {
            templateUrl: 'views/perfil1.html',
            restricted     : true
        })
        .when('/nuevaruta', {
            templateUrl: 'views/nuevaruta.html',
            controller : 'MapCtrl',
            restricted     : true
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            restricted     : false
        })
        .when('/ciudad', {
            templateUrl: 'views/ciuadad.html',
            controller : 'MapCtrl',
            restricted     : true
        })
        .when('/top10', {
            templateUrl: 'views/top10.html',
            restricted     : true
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            restricted     : true
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

MainApp.run(function($location, $rootScope, $route, AuthService) {

    $rootScope.$on('$locationChangeStart', function(evt, next, current) {

        var nextPath = $location.path(), nextRoute = $route.routes[nextPath];

        if (nextRoute && (nextRoute.restricted && !AuthService.isLoggedIn())) {

            $location.path("/");
        }
    });
});



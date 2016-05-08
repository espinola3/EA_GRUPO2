var MainApp = angular.module('MainApp', ['ngRoute', 'ServicesModule', 'ControllersModule']);

MainApp.config(['$routeProvider', function ($routeProvider) {

    console.log("CONFIG");

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            access     : {restricted: true}
        })
        .when('/login', {
            templateUrl: '/login.html',
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
            templateUrl: '/about.html',
            access     : {restricted: false}
        })
        .when('/two', {
            template: '<h1>This is page two!</h1>',
            access  : {restricted: false}
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

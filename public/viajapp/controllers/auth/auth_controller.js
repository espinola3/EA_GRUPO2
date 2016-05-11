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

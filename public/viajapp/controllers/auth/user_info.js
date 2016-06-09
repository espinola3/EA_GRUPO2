angular.module('ControllersModule')
    .controller(
        'userInfo',
        ['$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {

                $scope.getUserInfo = function () {
                    
                    return AuthService.isLoggedIn() ? AuthService.getUserInfo() : '';

                }


                $scope.getUserStatus = function () {

                    // call logout from service
                    AuthService.getUserStatus()
                        .then(function () {

                        });

                };

            }]);


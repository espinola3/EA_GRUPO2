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

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
                    AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.city, $scope.registerForm.email,$scope.registerForm.pic)
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
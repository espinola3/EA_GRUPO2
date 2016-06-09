angular.module('ControllersModule')
    .controller(
        'registerController',
        [
            '$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {
                console.log("REGISTER CONTROLLER - entra");

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


                $scope.register = function () {
                    // initial values
                    $scope.error    = false;
                    $scope.disabled = true;

                    // call register from service
                    AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.city, $scope.registerForm.email,$scope.registerForm.pic)
                        // handle success
                        .then(function () {
                            $location.url('/login');

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
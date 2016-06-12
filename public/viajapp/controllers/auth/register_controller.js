angular.module('ControllersModule')
    .controller(
        'registerController',
        [
            '$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {
                console.log("REGISTER CONTROLLER - entra");

                $scope.verificar = function verificar(v){
                    var p1 = document.getElementById('pass1');
                    if( p1.value != v){
                        document.getElementById('mensaje').innerHTML = "No coinciden las contraseñas";

                    }else{
                        document.getElementById('mensaje').innerHTML = "Las contraseñas coinciden";
                        return true;
                    }
                }


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
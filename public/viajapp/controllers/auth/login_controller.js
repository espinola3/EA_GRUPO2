angular.module('ControllersModule')
    .controller(
        'loginController',
        [
            '$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {
                console.log("LOGIN CONTROLLER - entra");
                $scope.loginFacebook = function () {
                    $http.get('/api/auth/facebook/callback').success(function (data) {
                            console.log('information data', data);
                            $rootScope.authenticated = true;
                            $location.path('/');
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                };
                $scope.login = function () {

                    // initial values
                    $scope.error    = false;
                    $scope.disabled = true;

                    // call login from service
                    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                        // handle success
                        .then(function () {
                            $location.url('/home');
                            
                            $scope.disabled  = false;
                            $scope.loginForm = {};
                        })
                        // handle error
                        .catch(function () {
                            $scope.error        = true;
                            $scope.errorMessage = "Invalid username and/or password";
                            $scope.disabled     = false;
                            $scope.loginForm    = {};
                        });

                };

            }]);

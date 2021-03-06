angular.module('ControllersModule')
    .controller(
        'loginController',
        [
            '$scope', '$location', 'AuthService',
            function ($scope, $location, AuthService) {


                $scope.login = function () {
                    $scope.error    = false;
                    $scope.disabled = true;

                    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                        .then(function () {
                            $location.url('/home');
                            
                            $scope.disabled  = false;
                            $scope.loginForm = {};
                        })
                        .catch(function () {
                            $scope.error        = true;
                            $scope.errorMessage = "Invalid username and/or password";
                            $scope.disabled     = false;
                            $scope.loginForm    = {};
                        });

                };

            }])
    .controller(
        'facebookLoginController',
        [
            '$scope', '$location', 'AuthService', '$routeParams',
            function ($scope, $location, AuthService, $routeParams) {
                AuthService.forceLogin($routeParams.fb_user);
                $location.url('/home');
            }]);

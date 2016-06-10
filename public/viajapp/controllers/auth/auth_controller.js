angular.module('ControllersModule')
    .controller(
        'authController',
        ['$scope', '$location', 'AuthService', 'modalDialog',
            function ($scope, $location, AuthService, passport) {

                $scope.logout = function () {

                    // call logout from service
                    AuthService.logout()
                        .then(function () {
                            $location.path('/login');
                        });

                };

                $scope.isLoggedIn = function () {

                    return AuthService.isLoggedIn();

                };

                $scope.isAdmin = function () {
                    return  'admin' == AuthService.getUserRole();

                };

                /*$scope.modalShown  = false;
                $scope.toggleModal = function () {
                    $scope.modalShown = !$scope.modalShown;
                };
               

}])

    .controller(
        'MyCtrl',
        ['$scope', 'modalDialog',
            function ($scope) {
                $scope.modalShown  = false;
                $scope.toggleModal = function () {
                    $scope.modalShown = !$scope.modalShown;
                };*/

            }]);


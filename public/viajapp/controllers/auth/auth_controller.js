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

                $scope.logedandrole = function () {
                    if([(AuthService.isLoggedIn() == true) && (AuthService.getUserRole() == true)])
                    {

                        return true;
                    }
                    else
                    {
                        console.log('PPasd', AuthService.isLoggedIn());
                        console.log('SSSSS', AuthService.getUserRole());
                        return false;
                    }

                };



                $scope.isLoggedIn = function () {

                    return AuthService.isLoggedIn();

                };

                $scope.UserRole = function () {
                    return AuthService.getUserRole();

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


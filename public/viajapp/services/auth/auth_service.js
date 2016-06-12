angular.module('ServicesModule').factory('AuthService',
    ['$q', '$timeout', '$http', '$cookies',
        function ($q, $timeout, $http , $cookies) {

            // create user variable
            var user = false;
            var usuario = {username:""};
            

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register,
                getUserInfo :getUserInfo,
                loginFacebook :loginFacebook,
                forceLogin: forceLogin,
                getUserRole: getUserRole
            });

            function isLoggedIn()
            {
                return $cookies.get('logged');

            }

            function getUserInfo() {
                return $cookies.getObject('user').username;
            }

            function getUserRole() {
                if(typeof $cookies.get('role') !== "undefined") {
                     return $cookies.get('role');


                }

                return false;

            }

            function loginFacebook () {

                 return $http.get('user/auth/facebook/callback').success(function (data) {

                        
                        $rootScope.authenticated = true;
                        $location.path('/');
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }

            function getUserStatus() {

                return $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if(data.status){
                            user = true;
                        } else {
                            user = false;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                    });
            }


            function forceLogin(username) {
                $cookies.put('logged', true);
                $cookies.putObject('user', {'username':username});
            }

            function login(username, password) {

                var deferred = $q.defer();
                $http.post('/user/login',
                    {username: username, password: password})
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            
                            user = true;
                            $cookies.put('logged', true);
                            $cookies.putObject('user', {username:username});
                            $cookies.put('role', data.user.role);
                            deferred.resolve();1
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                return deferred.promise;

            }

            function logout() {

                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    .success(function (data) {
                        user = false;
                        $cookies.remove('logged');
                        $cookies.remove('user');
                        $cookies.remove('role');
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(name, password, city, email, pic) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    {username: name, password: password, city:city, email:email ,pic:pic})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            deferred.resolve();
                        } else {
                            if(status == 401){
                                alert("Este usuario ya existe...");
                            deferred.reject();}
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                        alert("Lo sientimos! Este usuario ya existe... Prueba con otro!);");
                    });

                // return promise object
                return deferred.promise;

            }

            


// route middleware to make sure a user is logged in
            function isLoggedInFace (req, res, next) {

                // if user is authenticated in the session, carry on
                if (req.isAuthenticated())
                    return next();

                // if they aren't redirect them to the home page
                res.redirect('/');

            }

        }]);

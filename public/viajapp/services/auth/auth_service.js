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
                loginFacebook :loginFacebook
            });

            function isLoggedIn()
            {
                return $cookies.get('logged');

            }

            function getUserInfo() {
                return $cookies.getObject('user').username;
            }

            function loginFacebook () {

                 return $http.get('user/auth/facebook/callback').success(function (data) {

                        console.log('information data', data);
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

            

            function login(username, password) {

                var deferred = $q.defer();

                $http.post('/user/login',
                    {username: username, password: password})
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            //usuario={username:username};
                            user = true;
                            $cookies.put('logged', true);
                            $cookies.putObject('user', {'username':username});
                            deferred.resolve();
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

            function register(name, password, city, email) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    {username: name, password: password, city:city, email:email})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }
            // =====================================
            // FACEBOOK ROUTES =====================
            // =====================================
            // route for facebook authentication and login
            $http.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

            // handle the callback after facebook has authenticated the user
            $http.get('/auth/facebook/callback',
                passport.authenticate('facebook', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
                }));

            // route for logging out
            $http.get('/logout', function(req, res) {
                req.logout();
                res.redirect('/');
            });



// route middleware to make sure a user is logged in
            function isLoggedInFace (req, res, next) {

                // if user is authenticated in the session, carry on
                if (req.isAuthenticated())
                    return next();

                // if they aren't redirect them to the home page
                res.redirect('/');

            }

        }]);

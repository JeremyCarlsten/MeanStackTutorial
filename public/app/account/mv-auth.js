angular.module("app").factory("mvAuth", function ($http, mvIdentity, mvUser, mvNotifier, $q) {
    return {
        authenticateUser: function (username, password) {
            var defered = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    defered.resolve(true);
                } else {
                    defered.resolve(false);
                }
            });

            return defered.promise;
        },
        logoutUser: function () {
            var defered = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                mvIdentity.currentUser = undefined;
                defered.resolve();
            });

            return defered.promise;
        },
        authorizedCurrentUserForRoute: function(role){
                if(mvIdentity.isAuthorized(role)){
                    return true;
                }else{
                    mvNotifier.error("Whoa, That area is restricted. Please don't try that again.");
                    return $q.reject('not authorized')
                }
        },

        createUser: function(newuserData){
            var newUser = new mvUser(newuserData);
            var defered = $q.defer();
            newUser.$save().then(function(){
                mvIdentity.currentUser = newUser;
                defered.resolve();
            },function(response){
                defered.reject(response.data.reason);
            });

            return defered.promise;
        }
    }
});


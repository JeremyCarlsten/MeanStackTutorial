angular.module('app').controller('mvSignupController', function ($scope, $location, mvNotifier, mvAuth) {
    var self = this;


    self.signup = function(){
        var newUserData = {
            username: self.email,
            password: self.password,
            firstName: self.firstName,
            lastName: self.lastName
        };

        mvAuth.createUser(newUserData).then(function(){
            mvNotifier.notify('New User Created!');
            $location.path('/');
        }, function(reason){
            mvNotifier.error(reason);
        });
    }
});

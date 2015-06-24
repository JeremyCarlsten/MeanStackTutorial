angular.module('app').controller('mvNavBarLoginController', function ($location, mvIdentity, mvNotifier, mvAuth) {
    var self = this;

    self.identity = mvIdentity;
    self.signin = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                mvNotifier.notify("You have been successfully logged in!");
            } else {
                mvNotifier.notify("The username/Password was incorrect");
            }
        });
    };

    self.signout = function () {
        mvAuth.logoutUser().then(function () {
            self.username = "";
            self.password = "";
            mvNotifier.notify('You have been successfully logged out. Good By!');
            $location.path('/');
        });
    }
});

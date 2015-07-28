angular.module('app').controller('mvProfileController', function (mvNotifier, mvIdentity, mvAuth) {
    var self = this;


    self.email = mvIdentity.currentUser.username;
    self.password = mvIdentity.currentUser.password;
    self.firstName = mvIdentity.currentUser.firstName;
    self.lastName = mvIdentity.currentUser.lastName;


    self.update = function () {
        var newUserData = {
            username: self.email,
            firstName: self.firstName,
            lastName: self.lastName
        };

        if(self.password && self.password.length > 0){
            newUserData.password = self.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify('Profile was Updated');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }
});

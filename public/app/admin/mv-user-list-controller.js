angular.module('app').controller('mvUserListController', function(mvUser) {
    var self = this;

    self.user = mvUser.query();
});

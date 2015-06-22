angular.module('app').controller('mvNavBarLoginController', function($scope, mvIdentity, mvNotifier, mvAuth){
  $scope.identity = mvIdentity;
  $scope.signin = function(username, password){
      mvAuth.authenticateUser(username, password).then(function(success){
        if(success){
          mvNotifier.notify("You have been successfully logged in!");
        }else{
          mvNotifier.notify("The username/Password was incorrect");
        }
      });
  };
});

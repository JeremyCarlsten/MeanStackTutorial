angular.module('app').controller('mvNavBarLoginController', function($scope, $http, mvIdentity, mvNotifier){
  $scope.signin = function(username, password){
    $http.post('/login', {username: username, password: password}).then(function(response){
      if(response.data.success){
        mvIdentity.currentUser = response.data.user;
        mvNotifier.notify("You have been successfully logged in!");
      }else{
        mvNotifier.notify("The username/Password was incorrect");
      }
    });
  };
});
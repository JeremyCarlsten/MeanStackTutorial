angular.module('app').controller('mvNavBarLoginController', function($scope){
  $scope.signin = function(username, password){
    console.log("Attempting to login...");
  };
});
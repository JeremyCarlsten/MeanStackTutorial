angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    var routeRoleChecks = {
    admin: { auth: function(mvAuth){
            mvAuth.authorizedCurrentUserForRoute('admin')
        }}
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'mvSignupController',
            controllerAs: 'signupCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListController',
            controllerAs: 'userListCtrl',
            resolve: routeRoleChecks.admin
        });
});

angular.module('app').run(function($rootScope, $location){
   $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
      if(rejection == 'not authorized'){
          $location.path('/');
      }
   });
});
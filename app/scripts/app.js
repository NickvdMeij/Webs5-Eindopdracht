'use strict';

angular.module('pubcrawlApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'ngGPlaces'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/pubcrawls/list.html',
        controller: 'PubCrawlsCtrl'
      })
      .when('/pubcrawls', {
        templateUrl: 'partials/pubcrawls/list.html',
        controller: 'PubCrawlsCtrl'
      })
      .when('/pubcrawls/create', {
        templateUrl: 'partials/pubcrawls/create.html',
        controller: 'PubCrawlsCtrl'
      })
      .when('/pubcrawls/:pubcrawlId/edit', {
        templateUrl: 'partials/pubcrawls/edit.html',
        controller: 'PubCrawlsCtrl',
        authenticate: true
      })
      .when('/pubcrawls/:pubcrawlId', {
        templateUrl: 'partials/pubcrawls/view.html',
        controller: 'PubCrawlsCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })

  .config(function(ngGPlacesAPIProvider){
    ngGPlacesAPIProvider.setDefaults({
      radius:2500
    });
  })

  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });
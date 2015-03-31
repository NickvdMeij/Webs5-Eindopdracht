'use strict';

angular.module('pubcrawlApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {

    $scope.menu = [{
      "title": "Available Cities",
      "link": "cities"
    }];

    $scope.authMenu = [{
      "title": "Create New Pubcrawl",
      "link": "pubcrawls/create"
    },{
      "title": "Add a City",
      "link": "cities/create"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });

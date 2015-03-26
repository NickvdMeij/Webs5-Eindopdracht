'use strict';

angular.module('pubcrawlApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {

    $scope.authMenu = [{
      "title": "Create New Pubcrawl",
      "link": "pubcrawls/create"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });

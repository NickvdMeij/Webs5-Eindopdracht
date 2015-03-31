'use strict';

angular.module('pubcrawlApp')
  .controller('CitiesCtrl', function (
      $scope,
      City,
      $location,
      $routeParams
  ){

    $scope.create = function() {
      var city = new City({
        name: $scope.longitude,
        latitude: $scope.latitude,
        longitude: $scope.longitude
      });
      city.$save(function(response) {
        $location.path("cities/");
      });
    };

    $scope.find = function() {
      City.query(function(cities) {
        $scope.cities = cities;
      });
    };
  });

'use strict';

angular.module('pubcrawlApp')
  .controller('WaypointsCtrl', function (
      $scope,
      Waypoint,
      PubCrawl,
      ngGPlacesAPI,
      $routeParams,
      $rootScope,
      $http
  ){

    $scope.filterAlreadyAdded = function(waypoint) {
      for(var x = 0; x < $scope.pubcrawl.waypoints.length; x++){
        if(waypoint.reference === $scope.pubcrawl.waypoints[x].reference){
          return false;
        }
      }

      return true;
    };

    $scope.loadingWaypoints = false;

    $scope.searchGoogle = function(){
      $scope.loadingWaypoints = true;
      var city = $scope.pubcrawl.city;

      ngGPlacesAPI.nearbySearch({
        latitude: city.latitude,
        longitude: city.longitude
      }).then(function(data){
        $scope.loadingWaypoints = false;
        $scope.waypoints = data;
      });
    };

    $scope.addWaypoint = function(waypoint) {
      var newWaypoint = new Waypoint();
      newWaypoint.name = waypoint.name;
      newWaypoint.longitude = waypoint.geometry.location.D;
      newWaypoint.latitude = waypoint.geometry.location.k;
      newWaypoint.reference = waypoint.reference;
      newWaypoint.vicinity = waypoint.vicinity;

      newWaypoint.$save({
        pubcrawlId: $routeParams.pubcrawlId
      }, function(){
        $scope.find();
      });

    };

    $scope.removeWaypoint = function(waypoint) {
      Waypoint.delete({
        pubcrawlId: $routeParams.pubcrawlId,
        waypointId: waypoint._id
      }, function(){
        $scope.find();
      });

    };

    $scope.find = function() {
      PubCrawl.get({
        pubcrawlId: $routeParams.pubcrawlId
      }, function(pubcrawl) {
        $scope.pubcrawl = pubcrawl;
        $scope.searchGoogle();
      });
    };
  });

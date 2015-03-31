'use strict';

angular.module('pubcrawlApp')
  .controller('PubCrawlsCtrl', function (
      $scope,
      PubCrawl,
      City,
      $location,
      $routeParams,
      $rootScope
  ){

    $scope.hasJoined = function(pubcrawl){
      var userId = $rootScope.currentUser._id;

      for(var x = 0; x < pubcrawl.participants.length; x++){
        if(pubcrawl.participants[x]._id === userId){
          return true;
        }
      }

      return false;
    };

    $scope.joinPubcrawl = function(pubcrawl){
      PubCrawl.addParticipant({
        pubcrawlId: pubcrawl._id
      },{
        pubcrawlId: pubcrawl._id
      },function(){
        $scope.find();
      });
    }

    $scope.leavePubcrawl = function(pubcrawl){
      PubCrawl.removeParticipant({
        pubcrawlId: pubcrawl._id
      },{
        pubcrawlId: pubcrawl._id
      }, function(){
        $scope.find();
      });
    }

    $scope.loadCities = function() {
      City.query(function(cities) {
        $scope.cities = cities;
      });
    };

    $scope.create = function() {

      var pubcrawl = new PubCrawl({
        title: $scope.title,
        description: $scope.description,
        starts: $scope.dt,
        city: $scope.selectedCity.originalObject._id
      });
      pubcrawl.$save(function(response) {
        $location.path("pubcrawls/" + response._id);
      });
    };

    $scope.remove = function(pubcrawl) {
      pubcrawl.$remove();

      for (var i in $scope.pubcrawls) {
        if ($scope.pubcrawls[i] == pubcrawl) {
          $scope.pubcrawls.splice(i, 1);
        }
      }
    };

    $scope.update = function() {
      var pubcrawl = $scope.pubcrawl;
      pubcrawl.$update(function() {
        $location.path('pubcrawls/' + pubcrawl._id);
      });
    };

    $scope.find = function() {
      PubCrawl.query(function(pubcrawls) {
        $scope.pubcrawls = pubcrawls;
      });
    };

    $scope.findOne = function() {
      PubCrawl.get({
        pubcrawlId: $routeParams.pubcrawlId
      }, function(pubcrawl) {
        $scope.pubcrawl = pubcrawl;
      });
    };
  });

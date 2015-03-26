'use strict';

angular.module('pubcrawlApp')
  .controller('PubCrawlsCtrl', function ($scope, PubCrawls, $location, $routeParams, $rootScope, $http) {

    $scope.searchGoogle = function(){
      var city = null;
      for (var x = 0; x < $scope.places.length; x++) {
        if($scope.places[x].name === $scope.city) {
          city = $scope.places[x];
        }
      }

      $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyB9SyEDDzlK6shcKcnbPUx-C63um6LrtBE&location=" + city.latitude + "," + city.longitude + "&radius=2500&type=cafe")
      .success(function(data, status, headers, config){
        console.log(data);
      })
      .failure(function(data, status, headers, config){
        console.log(data);
      });
    }

    $scope.places = [{
      name: "Amsterdam",
      latitude: "52.365013",
      longitude: "4.902649"
    },{
      name: "Haarlem",
      latitude: "52.384689",
      longitude: "4.646530"
    },{
      name: "Den Haag",
      latitude: "52.065736",
      longitude: "4.308014"
    },{
      name: "Middelburg",
      latitude: "51.494530",
      longitude: "3.622742"
    },{
      name: "Den Bosch",
      latitude: "51.697832",
      longitude: "5.321503"
    },{
      name: "Maastricht",
      latitude: "50.849036",
      longitude: "5.703278"
    },{
      name: "Arnhem",
      latitude: "51.983973",
      longitude: "5.906224"
    },{
      name: "Zwolle",
      latitude: "52.516683",
      longitude: "6.083293"
    },{
      name: "Assen",
      latitude: "52.988079",
      longitude: "6.557465"
    },{
      name: "Groningen",
      latitude: "53.215388",
      longitude: "6.567078"
    },{
      name: "Leeuwarden",
      latitude: "53.198501",
      longitude: "5.798721"
    },{
      name: "Lelystad",
      latitude: "52.519041",
      longitude: "5.473938"
    }]

    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.create = function() {
      var pubcrawl = new PubCrawls({
        title: this.title,
        description: this.description,
        starts: this.dt
      });
      pubcrawl.$save(function(response) {
        $location.path("pubcrawls/" + response._id);
      });

      this.title = "";
      this.description = "";
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
      PubCrawls.query(function(pubcrawls) {
        $scope.pubcrawls = pubcrawls;
      });
    };

    $scope.findOne = function() {
      PubCrawls.get({
        pubcrawlId: $routeParams.pubcrawlId
      }, function(pubcrawl) {
        $scope.pubcrawl = pubcrawl;
      });
    };
  });

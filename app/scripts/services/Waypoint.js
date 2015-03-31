'use strict';

angular.module('pubcrawlApp')
  .factory('Waypoint', function ($resource) {
    return $resource('api/pubcrawls/:pubcrawlId/waypoints/:waypointId', {
      pubcrawlId: '@_id',
      waypointId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });

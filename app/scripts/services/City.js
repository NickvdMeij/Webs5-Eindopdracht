'use strict';

angular.module('pubcrawlApp')
  .factory('City', function ($resource) {
    return $resource('api/cities/:cityId', {
      pubcrawlId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });

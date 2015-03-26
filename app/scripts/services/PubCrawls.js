'use strict';

angular.module('pubcrawlApp')
  .factory('PubCrawls', function ($resource) {
    return $resource('api/pubcrawls/:pubcrawlId', {
      pubcrawlId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });

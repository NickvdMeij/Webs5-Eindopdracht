'use strict';

angular.module('pubcrawlApp')
  .factory('PubCrawl', function ($resource) {
    return $resource('api/pubcrawls/:pubcrawlId', {
      pubcrawlId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      addParticipant: {
      	method: 'PUT',
        url: 'api/pubcrawls/:pubcrawlId/addparticipant',
        responseType: 'json'
      },
      removeParticipant: {
      	method: 'PUT',
        url: 'api/pubcrawls/:pubcrawlId/removeparticipant',
        responseType: 'json'
      }
    });
  });

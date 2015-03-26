'use strict';

angular.module('pubcrawlApp')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });

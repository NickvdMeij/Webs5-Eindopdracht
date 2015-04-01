'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post(
    '/auth/users',
    users.create
  );
  app.get(
    '/auth/users/:userId',
    users.show
  );

  // Check if username is available
  app.get(
    '/auth/check_username/:username',
    users.exists
  );

  // Session Routes
  var session = require('../controllers/session');
  app.get(
    '/auth/session',
    auth.ensureAuthenticated,
    session.session
  );
  app.post(
    '/auth/session',
    session.login
  );
  app.del(
    '/auth/session',
    session.logout
  );

  // Cities Routes
  var cities = require('../controllers/cities');
  app.get(
    '/api/cities',
    cities.all
  );
  app.post(
    '/api/cities',
    cities.create
  );

  app.get(
    '/api/cities/:cityId',
    cities.show
  );


  //Setting up the pubcrawlId param
  app.param('cityId', cities.city);

  // Pubcrawls Routes
  var pubcrawls = require('../controllers/pubcrawls');
  app.get(
    '/api/pubcrawls',
    pubcrawls.all
  );
  app.post(
    '/api/pubcrawls',
    auth.ensureAuthenticated,
    pubcrawls.create
  );
  app.put(
    '/api/pubcrawls/:pubcrawlId/addparticipant',
    auth.ensureAuthenticated,
    pubcrawls.addParticipant
  );
  app.put(
    '/api/pubcrawls/:pubcrawlId/removeparticipant',
    auth.ensureAuthenticated,
    pubcrawls.removeParticipant
  );
  app.get(
    '/api/pubcrawls/:pubcrawlId',
    pubcrawls.show
  );
  app.put(
    '/api/pubcrawls/:pubcrawlId',
    auth.ensureAuthenticated,
    auth.pubcrawl.hasAuthorization,
    pubcrawls.update
  );
  app.del('/api/pubcrawls/:pubcrawlId',
    auth.ensureAuthenticated,
    auth.pubcrawl.hasAuthorization,
    pubcrawls.destroy
  );

  //Setting up the pubcrawlId param
  app.param('pubcrawlId', pubcrawls.pubcrawl);

  // Waypoint Routes
  var waypoints = require('../controllers/waypoints');
  app.get(
    '/api/pubcrawls/:pubcrawlId/waypoints',
    waypoints.all
  );
  app.post(
    '/api/pubcrawls/:pubcrawlId/waypoints',
    auth.ensureAuthenticated,
    waypoints.create
  );
  app.del(
    '/api/pubcrawls/:pubcrawlId/waypoints/:waypointId',
    auth.ensureAuthenticated,
    auth.pubcrawl.hasAuthorization,
    waypoints.destroy
  );

  //Setting up the waypointId param
  app.param('waypointId', waypoints.waypoint);

  // Angular Routes
  app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }

    res.render('index.html');
  });

}
'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // Blog Routes
  var barraces = require('../controllers/barraces');
  app.get('/api/barraces', barraces.all);
  app.post('/api/barraces', auth.ensureAuthenticated, barraces.create);
  app.get('/api/barraces/:barRaceId', barraces.show);
  app.put('/api/barraces/:barRaceId', auth.ensureAuthenticated, auth.barrace.hasAuthorization, barraces.update);
  app.del('/api/barraces/:barRaceId', auth.ensureAuthenticated, auth.barrace.hasAuthorization, barraces.destroy);

  //Setting up the barRaceId param
  app.param('barRaceId', barraces.barrace);

  // Blog Routes
  var bars = require('../controllers/bars');
  app.get('/api/bars', bars.all);
  app.post('/api/bars', auth.ensureAuthenticated, bars.create);
  app.get('/api/bars/:barId', bars.show);
  app.put('/api/bars/:barId', auth.ensureAuthenticated, auth.bar.hasAuthorization, bars.update);
  app.del('/api/bars/:barId', auth.ensureAuthenticated, auth.bar.hasAuthorization, bars.destroy);

  //Setting up the barId param
  app.param('barId', bars.bar);

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
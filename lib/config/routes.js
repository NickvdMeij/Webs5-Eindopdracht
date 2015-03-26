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
  var pubcrawls = require('../controllers/pubcrawls');
  app.get('/api/pubcrawls', pubcrawls.all);
  app.post('/api/pubcrawls', auth.ensureAuthenticated, pubcrawls.create);
  app.get('/api/pubcrawls/:pubcrawlId', pubcrawls.show);
  app.put('/api/pubcrawls/:pubcrawlId', auth.ensureAuthenticated, auth.pubcrawl.hasAuthorization, pubcrawls.update);
  app.del('/api/pubcrawls/:pubcrawlId', auth.ensureAuthenticated, auth.pubcrawl.hasAuthorization, pubcrawls.destroy);

  //Setting up the pubcrawlId param
  app.param('pubcrawlId', pubcrawls.pubcrawl);

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
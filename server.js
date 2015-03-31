'use strict';

// Module dependencies.
var express = require('express');
var http = require('http');
var passport = require('passport');
var path = require('path');
var fs = require('fs');
var mongoStore = require('connect-mongo')(express);
var config = require('./lib/config/config');

// Make an express app
var app = express();

// Connect to database
var db = require('./lib/db/mongo').db;

// Bootstrap mongodb models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Require passport configs
var pass = require('./lib/config/pass');

// Apply front-end entrypoint
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.errorHandler());
app.set('views', __dirname + '/app/views');

// Apply viewengine and logger
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.logger('dev'));

// Apply cookie parser
app.use(express.cookieParser());

// Apply body parser and method override
app.use(express.bodyParser());
app.use(express.methodOverride());

// Apply session
app.use(express.session({
  secret: 'webs5eindopdracht',
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  })
}));

// Apply passport session
app.use(passport.initialize());
app.use(passport.session());

// Apply Routes
app.use(app.router);

// Bootstrap routes
require('./lib/config/routes')(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
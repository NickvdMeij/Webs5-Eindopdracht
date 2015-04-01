var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var mongoose = require('mongoose');

var config = require('./../lib/config/config');

// Make an express app
var app = require('./../server.js').getApp;

var Session = require('supertest-session')({
	app: app
});

describe('Database', function(){
	var userId;
	var cityId;

	before(function(done){
		this.sess = new Session();

		// Connect to Database
		mongoose.connect(config.testdb, function (err, res) {
			done();
		});

	});

	describe('User', function(){
		it('should make a new user', function(done){
			mongoose.model('User').remove({}, function(err){
				var user = {
					username: 'TestAccount',
					email: 'test@example.com',
					password: 'test1234'
				}

				request('http://localhost:3000')
					.post('/auth/users')
					.send(user)
					.expect(200)
					.end(function(err, res){
						userId = res.body._id;
						if(err){
							done(err);
						} else {
							done();
						}
					});
			});

		});

		it('should log the user in', function(done){
			var user = {
				username: 'TestAccount',
				email: 'test@example.com',
				password: 'test1234'
			}

			request('http://localhost:3000')
				.post('/auth/session')
				.send(user)
				.expect(200)
				.end(function(err, res){
					if(err){
						done(err);
					}else{
						done();
					}
				})
		});
	});

	describe('Cities', function(){
		it('should return an object on post request and save the object in the db', function(done){
			var city = {
				name: 'Arnhem',
				latitude: '5.12467',
				longitude: '52.15478'
			};

			request(app)
				.post('/api/cities')
				.send(city)
				.expect(200)
				.end(function(err, res){
					cityId = res.body._id;
					if(err){
						done(err);
					}else{
						done();
					}
				});
		});

		it('should return an array of cities', function(done){
			request(app)
				.get('/api/cities')
				.expect(200)
				.end(function(err, res){
					if(err){
						done(err);
					}else{
						done();
					}
				});
		});

		it('should return a single city', function(done){
			request(app)
				.get('/api/cities/' + cityId)
				.expect(200)
				.end(function(err, res){
					if(err){
						done(err);
					}else{
						done();
					}
				});
		});
	});

	describe('Pubcrawls', function(){
		it('should return an array of pubcrawls', function(done){
			request(app)
				.get('/api/pubcrawls')
				.expect(200)
				.end(function(err, res){
					if(err){
						done(err);
					}else{
						done();
					}
				});
		});
	});

	describe('Homepage', function(){
		it('should return the home page', function(done){
			request(app)
				.get('/')
				.expect(200)
				.end(function(err, res){
					if(err){
						done(err);
					}else{
						done();
					}
				});
		});
	});

	after(function(){
		this.sess.destroy();
	});
});
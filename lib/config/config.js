// Mongodb config
module.exports = {
	port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/development',
    testdb: 'mongodb://localhost/testing'
}
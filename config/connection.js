// initialize variables and import required module
const { connect, connection } = require('mongoose');

// define the connection string for the MongoDB database
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

// establish a connection to the MongoDB database
connect(connectionString, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

// export the connection object for external use
module.exports = connection;

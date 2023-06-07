const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersArr } = require('./data');

// return error if there is an issue connecting to the database
connection.on('error', (err) => err);

// connection is established
connection.once('open', async () => {
  // log connected message to the terminal
  console.log('connected');

  // drop existing users
  await User.deleteMany({});

  // drop existing thoughts
  await Thought.deleteMany({});

  // create empty array to hold the users
  const users = [];

  // add users to the users array
  for (let i = 0; i < usersArr.length; i++) {
    const user = usersArr[i],
          { username, email } = user;

    users.push({
      username,
      email
    });
  }

  // add users to the collection and await the results
  await User.collection.insertMany(users);

  // log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

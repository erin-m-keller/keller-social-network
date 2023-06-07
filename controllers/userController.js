const { User, Thought } = require('../models');

module.exports = {
  // get all users
  getUsers(req, res) {
    // find all users
    User.find()
    // return data
      .then((users) => res.json(users))
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  // create user
  createUser(req, res) {
    // create a new user
    User.create(req.body)
      // return data
      .then((user) => res.json(user))
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
};

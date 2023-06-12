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
  // get a single user
  getSingleUser(req, res) {
    // find user using id param
    User.findOne({ _id: req.params.userId })
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then((user) =>
        !user 
          // if user not found, return status 404 and error message
          ? res.status(404).json({ message: 'No user with that ID' })
          // else, return user
          : res.json(user)
      )
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    // find and update a specific user
    User.findOneAndUpdate(
      { _id: req.params.userId }, // user id
      { $set: req.body }, // data to update
      { runValidators: true, new: true } // run any validation necessary on the data
    // return data
    ).then((user) =>
        !user
          // if user not found, return status 404 and error message
          ? res.status(404).json({ message: 'No user with this id!' })
          // else, return user
          : res.json(user)
      )
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
};

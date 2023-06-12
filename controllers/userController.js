const { User, Thought } = require('../models');

module.exports = {
  /**
   * @getUsers
   * returns a list of all users
   */
  getUsers(req, res) {
    // find all users
    User.find()
      // return data
      .then((users) => res.json(users))
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @createUser
   * creates a new user, using username
   * and email
   */
  createUser(req, res) {
    // create a new user
    User.create(req.body)
      // return data
      .then((user) => res.json(user))
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @getSingleUser
   * returns a specific user based on id
   */
  getSingleUser(req, res) {
    // find user using id param
    User.findOne({ _id: req.params.userId })
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then((user) =>
        !user 
          // if user not found, return status 404 and error message
          ? res.status(404).json({ message: 'No user with that ID.' })
          // else, return user
          : res.json(user)
      )
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @updateUser
   * updates a specific users username based on id
   */
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
          ? res.status(404).json({ message: 'No user with this id.' })
          // else, return user
          : res.json(user)
      )
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @deleteUser
   * deletes a specific user based on id, along
   * with any associated thoughts
   */
  deleteUser(req, res) {
    // find and delete a specific user
    User.findOneAndDelete({ _id: req.params.userId })
      // return data
      .then((user) =>
        !user
          // if user not found, return status 404 and error message
          ? res.status(404).json({ message: 'No user with this id.' })
          // delete associated thoughts
          : Thought.deleteMany({ userId: req.params.userId }) 
      )
      // return success message once deleted
      .then(() => res.json({ message: 'User and associated thoughts deleted.' }))
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
};

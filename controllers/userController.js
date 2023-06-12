const { User, Thought } = require('../models');

/**
 * @countFriends
 * Uses the virtual property in the User model
 * to calculate the number of friends for the user
 */
const countFriends = async () => {
  // build an aggregation pipeline on the User model
  const getData = await User.aggregate() 
    // count the number of friends in the document
    .count('friendCount')
    // execute the aggregation pipeline
    .exec();
  // extract the friendCount value from the aggregation result
  const count = getData[0].friendCount;
  return count;
}

module.exports = {
  /**
   * @getUsers
   * returns a list of all users
   */
  getUsers(req, res) {
    // find all users
    User.find()
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then(async (user) => {
        // initialize variables
        const userObj = {
          user, // user data
          friendCount: await countFriends(), // friend count
        };
        // return the user object
        return res.json(userObj); 
      })
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
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then(async (user) => {
        // initialize variables
        const userObj = {
          user, // user data
          friendCount: await countFriends(), // friend count
        };
        // return the user object
        return res.json(userObj); 
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @getSingleUser
   * returns a specific user based on id
   */
  getSingleUser(req, res) {
    // initialize variables
    const { userId } = req.params;
    // find user using id param
    User.findOne({ _id: userId })
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then(async (user) => {
        if (!user) {
          // if user not found, return status 404 and error message
          res.status(404).json({ message: 'No user with this ID.' })
        }
        // initialize variables
        const userObj = {
          user, // user data
          friendCount: await countFriends(), // friend count
        };
        // return the user object
        return res.json(userObj);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @updateUser
   * updates a specific users username based on id
   */
  updateUser(req, res) {
    // initialize variables
    const { userId } = req.params;
    // find and update a specific user
    User.findOneAndUpdate(
      { _id: userId }, // user id
      { $set: req.body }, // data to update
      { runValidators: true, new: true } // run any validation necessary on the data
    )
    // exclude the '__v' field from the returned document
    .select('-__v')
    // return data
    .then(async (user) => {
        if (!user) {
          // if user not found, return status 404 and error message
          res.status(404).json({ message: 'No user with this ID.' })
        }
        // initialize variables
        const userObj = {
          user, // user data
          friendCount: await countFriends(), // friend count
        };
        // return the user object
        return res.json(userObj);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @deleteUser
   * deletes a specific user based on id, along
   * with any associated thoughts
   */
  deleteUser(req, res) {
    // initialize variables
    const { userId } = req.params;
    // find and delete a specific user
    User.findOneAndDelete({ _id: userId })
      // exclude the '__v' field from the returned document
      .select('-__v')
      // return data
      .then((user) =>
        !user
          // if user not found, return status 404 and error message
          ? res.status(404).json({ message: 'No user with this ID.' })
          // delete associated thoughts
          : Thought.deleteMany({ userId: userId }) 
      )
      // return success message once deleted
      .then(() => res.json({ message: 'User and associated thoughts deleted.' }))
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  }
};

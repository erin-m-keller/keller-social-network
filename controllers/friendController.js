const { User, Thought } = require('../models');

module.exports = {
  /**
   * @addFriend
   * adds a friend to the specified users
   * friend list
   */
  addFriend(req, res) {
    // find the user by id
    User.findById(req.params.userId)
    // return data
    .then((user) => {
      // if user not found
      if (!user) {
        // return status 404 and error message
        return res.status(404).json({ message: 'No user with this ID.' });
      }
      // add the friend ID to the user's friends array
      user.friends.push(req.params.friendId);
      // save the updated user object
      return user.save();
    })
    // return updated data
    .then((updatedUser) => {
      // return the updated user object with the new friend added
      res.json(updatedUser);
    })
    // return status 500 and error message
    .catch((err) => res.status(500).json(err));
  }
};

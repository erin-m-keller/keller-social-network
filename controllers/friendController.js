const { User } = require('../models');

module.exports = {
  /**
   * @addFriend
   * adds a friend to the specified users
   * friend list
   */
  addFriend(req, res) {
    // initialize variables
    const { userId, friendId } = req.params;
    // find the user by id
    User.findById(userId)
    // return data
    .then((user) => {
      // if user not found
      if (!user) {
        // return status 404 and error message
        return res.status(404).json({ message: 'No user with this ID.' });
      }
      // add the friend ID to the user's friends array
      user.friends.push(friendId);
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
  },
  /**
   * @deleteFriend
   * deletes a specific friend based on id, from
   * the specified users friend list
   */
  deleteFriend(req, res) {
    // initialize variables
    const { userId, friendId } = req.params;
    // find the user by id
    User.findById(userId)
      .then((user) => {
        // if user not found
        if (!user) {
          // return status 404 and error message
          return res.status(404).json({ message: 'No user with this ID.' });
        }
        // find the index of the friendId in the user's friends array
        const friendIdx = user.friends.indexOf(friendId);
        // if friendId not found 
        if (friendIdx === -1) {
          // return status 404 and error message
          return res.status(404).json({ message: 'No friend with this ID.' });
        }
        // remove the friendId from the user's friends array
        user.friends.splice(friendIdx, 1);
        // save the updated user object
        return user.save();
      })
      // return updated data
      .then((updatedUser) => {
        // return the updated user object with the friend deleted
        res.json(updatedUser);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  }
};

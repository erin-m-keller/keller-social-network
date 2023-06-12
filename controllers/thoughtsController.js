const { Thought, User } = require('../models');

module.exports = {
  /**
   * @getThoughts
   * returns a list of all thoughts
   */
  getThoughts(req, res) {
    // find all thoughts
    Thought.find()
      // return data
      .then((users) => res.json(users))
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  },
  /**
   * @createThought
   * creates a new thought, using thought text
   * username, and user id
   */
  createThought(req, res) {
    // initialize variables
    const { thoughtText, username, userId } = req.body;
    // create a new thought
    Thought.create({ thoughtText, username, userId })
    .then((thought) => {
      console.log("create thought first then");
      // push the created thought's id to the user's thoughts array
      return User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      )
      // return updated data
      .then((updatedUser) => {
        // return the created thought and updated user object
        res.json({ thought, updatedUser });
      });
    })
    .catch((err) => res.status(500).json(err));
  },
  /**
   * @deleteThought
   * deletes a thought based on id
   */
  deleteThought(req, res) {
    // initialize variables
    const { thoughtId } = req.params;
    console.log("thoughtId: " + thoughtId);
    // find and delete a specific user
    Thought.findOneAndDelete({ _id: thoughtId })
      // return data
      .then((thought) =>
        !thought
          // if thought not found, return status 404 and error message
          ? res.status(404).json({ message: 'No thought with this ID.' })
          // return success message once deleted
          : res.json({ message: 'User and associated thoughts deleted.' }) 
      )
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  }
};

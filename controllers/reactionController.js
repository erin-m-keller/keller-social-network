const { Thought } = require('../models');

module.exports = {
  /**
   * @addReaction
   * adds a reaction to the thought
   * that is specified by id
   */
  addReaction(req, res) {
    // initialize variables
    const { thoughtId } = req.params,
          { reactionBody, username } = req.body,
          newReaction = {
            reactionBody,
            username
          };
    // find the thought by id
    Thought.findById(thoughtId)
      // return data
      .then((thought) => {
        if (!thought) {
          // if thought not found, return status 404 and error message
          return res.status(404).json({ message: 'No thought with this ID.' });
        }
        // add the new reaction to the thought's reactions array
        thought.reactions.push(newReaction);
        // save the updated thought object
        return thought.save();
      })
      // return updated data
      .then((updatedThought) => {
        // return the updated thought object with the new reaction added
        res.json(updatedThought);
      })
      // return status 500 and error message
      .catch((err) => res.status(500).json(err));
  }
};

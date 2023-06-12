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
  },
  /**
   * @deleteReaction
   * deletes a specific user based on id, along
   * with any associated thoughts
   */
  deleteReaction(req, res) {
    // Initialize variables
    const { thoughtId } = req.params;
    const { reactionId } = req.body;
  
    // Find the thought by id
    Thought.findById(thoughtId)
      .then((thought) => {
        if (!thought) {
          // If thought not found, return status 404 and error message
          return res.status(404).json({ message: 'No thought with this ID.' });
        }

        console.log("thought.reactions: " + JSON.stringify(thought.reactions));
  
        // Find the index of the reaction to be deleted
        const reactionIdx = thought.reactions.findIndex(
          (reaction) => reaction.reactionId.toString() === reactionId
        );
  
        // If the reaction is not found
        if (reactionIdx === -1) {
          // Return status 404 and error message
          return res.status(404).json({ message: 'No reaction with this ID.' });
        }
  
        // Remove the reaction from the thought's reactions array
        thought.reactions.splice(reactionIdx, 1);
  
        // Save the updated thought object
        return thought.save();
      })
      .then((updatedThought) => {
        // Return the updated thought object after deleting the reaction
        res.json(updatedThought);
      })
      .catch((err) => {
        // Return status 500 and error message
        res.status(500).json(err);
      });
  }
};

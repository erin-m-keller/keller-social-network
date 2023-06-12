const { Thought } = require('../models');

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
  }
};

// initialize variables and import required module
const router = require('express').Router(),
      { 
        getThoughts,
        createThought,
        deleteThought,
      } = require('../../controllers/thoughtsController.js');

// the path i:s /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// the path is: /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .delete(deleteThought);

// export the routes
module.exports = router;
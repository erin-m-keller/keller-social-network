// initialize variables and import required module
const router = require('express').Router(),
      { 
        getThoughts,
      } = require('../../controllers/thoughtsController.js');

// the path i:s /api/thoughts
router.route('/').get(getThoughts);


// export the routes
module.exports = router;
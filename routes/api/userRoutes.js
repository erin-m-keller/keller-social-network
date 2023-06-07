// initialize variables and import required module
const router = require('express').Router(),
      { 
        getUsers,
        createUser,
      } = require('../../controllers/userController.js');

// the path is /api/users
router.route('/').get(getUsers).post(createUser);

// export the routes
module.exports = router;
// initialize variables and import required module
const router = require('express').Router(),
      { 
        getUsers,
      } = require('../../controllers/userController.js');

// the path is /api/users
router.route('/').get(getUsers).post(createUser);

module.exports = router;
// initialize variables and import required module
const router = require('express').Router(),
      { 
        getUsers,
        createUser,
        getSingleUser,
        updateUser,
        deleteUser,
      } = require('../../controllers/userController.js');

// the path is /api/users
router.route('/').get(getUsers).post(createUser);

// the path is /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// export the routes
module.exports = router;
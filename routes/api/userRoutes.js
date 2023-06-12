// initialize variables and import required module
const router = require('express').Router(),
      { 
        getUsers,
        createUser,
        getSingleUser,
      } = require('../../controllers/userController.js');

// the path is /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  //.put(updateCourse)
  //.delete(deleteCourse);

// export the routes
module.exports = router;
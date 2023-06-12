// initialize variables and import required module
const router = require('express').Router(),
      userRoutes = require('./userRoutes');

// set the users api path
router.use('/users', userRoutes);

// export the routes
module.exports = router;

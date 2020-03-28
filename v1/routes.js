var router = require('express').Router();
const userRouter	= require('./components/user/routes');

router.use('/user', userRouter);
 
module.exports = router;   
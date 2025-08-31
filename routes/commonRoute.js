const express = require('express');
const router = express.Router();
const userRouter = require('./userRoute');
const taskRouter = require('./taskRoute');


router.use('/api/user', userRouter);
router.use('/api/task', taskRouter);


module.exports = router;
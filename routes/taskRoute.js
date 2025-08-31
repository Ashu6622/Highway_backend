const express = require('express');
const {addTask, deleteTask, allTask} = require('../controllers/taskControllers');
const router = express.Router();
const {jwtAuth} = require('../middleware/jwt');

router.post('/addtask',jwtAuth, addTask);
router.get('/alltask',jwtAuth, allTask);
router.delete('/deletetask/:id',jwtAuth, deleteTask);


module.exports = router;
const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');

router.post('/', taskController.addTask);
router.post('/:id', taskController.addTask);
router.get('/', taskController.findEmp);
router.get('/:id', taskController.findTask);
router.put('/:id', taskController.updateTask);



module.exports = router;
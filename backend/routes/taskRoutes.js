const express = require('express')
const { createTask, deleteTask, markTaskComplete } = require('../controllers/taskControllers')
const router = express.Router()

router.post('/create/:id', createTask)
router.delete('/:id', deleteTask)
router.patch('/:id', markTaskComplete)

module.exports = router

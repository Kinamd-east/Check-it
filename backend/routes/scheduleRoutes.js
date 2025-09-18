const express = require('express')
const router = express.Router()

const {
  createSchedule,
  getSchedule,
  getUserSchedules,
} = require('../controllers/scheduleControllers')

router.post('/create/:id', createSchedule)
router.get('/user/:id', getUserSchedules)
router.get('/:id', getSchedule)

module.exports = router

const Schedule = require('../models/Schedule')
const User = require('../models/User')

const createSchedule = async (req, res) => {
  const { name, description } = req.body
  const { id } = req.params
  try {
    const user = await User.findById(id)

    if (!user) return res.status(400).json({ message: "User doesn't exist" })

    if (user.schedules.length >= user.storage) {
      return res
        .status(400)
        .json({ message: 'Upgrade to create more schedules' })
    }

    const schedule = new Schedule({
      name,
      description,
      author: id,
      maxStrikes: user.maxStrikes,
      lastResetDate: Date.now(),
      strikes: 0,
      streaks: 0,
      tasks: [],
    })
    await schedule.save()
    user.schedules.push(schedule._id)
    await user.save()

    console.log(schedule)

    res
      .status(201)
      .json({ message: 'Schedule creation successful', schedule: schedule })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: 'Schedule creation failed', error: err.message })
  }
}

const getUserSchedules = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findById(id).populate('schedules')

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" })
    }

    res.status(200).json({ schedules: user.schedules })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const getSchedule = async (req, res) => {
  try {
    const { id } = req.params
    const schedule = await Schedule.findById(id).populate('tasks');
    return res
      .status(201)
      .json({ message: 'Schedule retrieved succesfully', schedule: schedule })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: 'Schedule retrieval failed', error: err.message })
  }
}

module.exports = {
  createSchedule,
  getUserSchedules,
  getSchedule,
}

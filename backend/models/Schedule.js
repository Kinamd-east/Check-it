const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  lockedUntil: {
    type: Date,
    default: null,
  },  
  maxStrikes: {
    type: Number,
    default: 3,
  },
  lastResetDate: {
    type: Date,
    default: Date.now,
  },
  strikes: {
    type: Number,
    default: 0,
  },
  streaks: {
    type: Number,
    default: 0, // 🔥 per-schedule streak counter
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
})

module.exports = mongoose.model('Schedule', scheduleSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['INFO', 'ALERT', 'SECURITY', 'PROMOTION'],
      default: 'INFO',
    },
    status: {
      type: String,
      enum: ['UNREAD', 'READ'],
      default: 'UNREAD',
    },
  },
  { timestamps: true },
)

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    maxStrikes: {
      type: Number,
      default: 3,
    },
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    ],
    storage: {
      type: Number,
      default: 1, // free users = 1 schedule
    },
    notifications: [notificationSchema],
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)

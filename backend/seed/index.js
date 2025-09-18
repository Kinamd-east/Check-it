require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const User = require('../models/User') // Adjust path to your User model

;(async () => {
  try {
    connectDB()

    console.log('✅ Connected to MongoDB')

    // Add the field to every user
    const result = await User.updateMany(
      {}, // Match all documents
      { $set: { lockedUntil: null } }, // Change as needed
    )

    console.log(`✅ Updated ${result.modifiedCount} users`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Error updating users:', err)
    process.exit(1)
  }
})()

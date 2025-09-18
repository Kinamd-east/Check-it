const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "UNCOMPLETED", "MISSED"],
    default: "PENDING",
  },
  time: {
    type: String, // "HH:mm"
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);

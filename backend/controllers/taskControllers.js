const Task = require('../models/Task')
const Schedule = require('../models/Schedule')
const User = require('../models/User')

const createTask = async (req, res) => {
  try {
    const { id } = req.params
    const { name, time, author } = req.body

    const schedule = await Schedule.findById(id)
    const user = await User.findById(author)
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const task = new Task({
      author,
      schedule: id,
      name,
      time,
      status: 'PENDING'
    })

    await task.save()

    // push into schedule
    schedule.tasks.push(task._id)
    await schedule.save()

    res.status(201).json({ message: 'Task created successfully', task })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create task', error: err.message })
  }
}

// PATCH /task/:id/complete
const markTaskComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // parse task time
    const [hour, min] = task.time.split(":").map(Number);
    const now = new Date();
    const taskTime = new Date();
    taskTime.setHours(hour, min, 0, 0);

    // check if too early
    if (now < taskTime) {
      return res
        .status(400)
        .json({ message: "Task time hasn’t passed yet" });
    }

    // mark completed only if not already missed
    if (task.status !== "MISSED") {
      task.status = "COMPLETED";
      task.completed = true;
      await task.save();

      // add streak
      await Schedule.findByIdAndUpdate(task.schedule, {
        $inc: { streaks: 1 },
      });

      return res.json({ message: "✅ Task completed", task });
    } else {
      return res
        .status(400)
        .json({ message: "Task already MISSED, cannot complete" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error completing task", error: err.message });
  }
};


// DELETE /task/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // also remove from schedule.tasks
    await Schedule.findByIdAndUpdate(task.schedule, {
      $pull: { tasks: task._id },
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};




module.exports = { createTask, deleteTask, markTaskComplete }

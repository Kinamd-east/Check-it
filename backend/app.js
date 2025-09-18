require('dotenv').config()
const express = require('express')
// const connectDB = require('./config/db')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cron = require("node-cron");
const Task = require("./models/Task");
const Schedule = require("./models/Schedule");
const cors = require('cors')
// const User = require("./models/User");
// const axios = require("axios")
const authRoutes = require('./routes/authRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')
// const subscriptionRoutes = require("./routes/subscriptionRoutes");
const taskRoutes = require('./routes/taskRoutes')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()
app.use(
  cors({
    origin: 'https://check-it-site.onrender.com', // your React app's address
    credentials: true, // allow cookies/session
  }),
)
app.set("trust proxy", 1); // Required for cookies to work on Render!
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    },
  }),
)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      partitioned: true,
      secure: true,
      sameSite: "none", // Set to true if using HTTPS
    },
  }),
);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('DB Connection Error:', error)
  }
}

connectDB()

app.use('/auth', authRoutes)
app.use('/schedule', scheduleRoutes)
app.use('/task', taskRoutes)
cron.schedule("* * * * *", async () => {
  const now = new Date();
  console.log("⏰ Cron tick:", now.toISOString());

  try {
    const tasks = await Task.find({ status: { $in: ["PENDING", "UNCOMPLETED"] } });

    for (const task of tasks) {
      try {
        if (!task.time) continue;

        const [hourStr, minStr] = String(task.time).split(":");
        const hour = Number(hourStr);
        const min = Number(minStr);

        if (Number.isNaN(hour) || Number.isNaN(min)) continue;

        const taskTime = new Date(now);
        taskTime.setHours(hour, min, 0, 0);

        const taskTimeMs = taskTime.getTime();
        const graceMs = 5 * 60 * 1000;
        const thresholdMs = taskTimeMs + graceMs;

        // UNCOMPLETED case
        if (now.getTime() >= taskTimeMs && now.getTime() < thresholdMs) {
          if (task.status !== "UNCOMPLETED") {
            task.status = "UNCOMPLETED";
            await task.save();
            console.log(`⚠️ Marked UNCOMPLETED: ${task._id}`);
          }
          continue;
        }

        // MISSED case
        if (now.getTime() >= thresholdMs) {
          if (task.status !== "MISSED") {
            task.status = "MISSED";
            await task.save();
            console.log(`❌ Marked MISSED: ${task._id}`);

            // 🔥 add strike + check reset here
            if (task.schedule) {
              const schedule = await Schedule.findById(task.schedule);
              if (!schedule) continue;

              schedule.strikes += 1;

              if (schedule.strikes >= schedule.maxStrikes) {
                schedule.strikes = 0;
                schedule.streaks = 0;
                schedule.lockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
                console.log(`💥 Schedule ${schedule._id} reset + locked for 24h`);
              }

              await schedule.save();
            }
          }
        }
      } catch (innerErr) {
        console.error("Error handling task", task._id, innerErr);
      }
    }
  } catch (err) {
    console.error("Cron top-level error:", err);
  }
});

cron.schedule("0 0 * * *", async () => {
  console.log("🌙 Running daily reset job...");

  try {
    const schedules = await Schedule.find().populate("tasks");

    for (let schedule of schedules) {
      const lastReset = new Date(schedule.lastResetDate).toDateString();
      const today = new Date().toDateString();

      // if already reset today, skip
      if (lastReset === today) continue;

      // check tasks
      const allCompleted = schedule.tasks.every((t) => t.status === "COMPLETED");
      const anyMissed = schedule.tasks.some((t) => t.status === "MISSED");

      if (allCompleted && !anyMissed) {
        schedule.streaks += 1; // add streak
      } else {
        schedule.streaks = 0; // reset streak
      }

      // reset strikes
      schedule.strikes = 0;

      // reset tasks
      for (let task of schedule.tasks) {
        task.status = "PENDING";
        task.completed = false;
        task.missed = false;
        await task.save();
      }

      // update reset date
      schedule.lastResetDate = new Date();
      await schedule.save();

      console.log(`✅ Reset schedule ${schedule._id}`);
    }
  } catch (err) {
    console.error("Reset cron error:", err.message);
  }
});

// app.use("/", subscriptionRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

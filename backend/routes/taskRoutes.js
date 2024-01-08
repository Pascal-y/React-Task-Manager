const express = require("express")
const Task = require("../model/taskModel")
const { createTask, getTasks, getTask, deleteTask, updateTask } = require("../controllers/taskController")
const router = express.Router()

//creating a task
router.post("/api/tasks", createTask)

//Get or Read All Task
router.get("/api/tasks", getTasks)

//Get Single Task by ID
router.get("/api/tasks/:id", getTask)

//Delete Task
router.delete("/api/tasks/:id", deleteTask)

//Updating Task
router.patch("/api/tasks/:id", updateTask)

module.exports = router
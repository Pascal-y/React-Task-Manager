const mongoose = require("mongoose")

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true]
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamp: true
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task
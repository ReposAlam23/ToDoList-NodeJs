const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    todoList : String
})

module.exports = mongoose.model("todoList", todoSchema)
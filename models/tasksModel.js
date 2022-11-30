const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title: { type: String, required: true },
    is_completed: { type: Boolean, default: false }
}, { versionKey: false })

const tasksModel = mongoose.model('tasks', tasksSchema)

module.exports=tasksModel
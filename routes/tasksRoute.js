const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const tasksModel = require('../models/tasksModel.js')

router.post('/', async (req, res) => {
    try {
        const allTasks = req.body.tasks ?
            [...req.body.tasks] : [req.body]
        let resBody = {}
        const tasksInserted = await tasksModel.insertMany(allTasks)
        if (tasksInserted.length > 1) {
            resBody.tasks = []
            for (const taskObj of tasksInserted) {
                resBody.tasks.push({ id: taskObj._id })
            }
        }
        else {
            resBody = { id: tasksInserted[0]._id }
        }

        return res.status(201).json(resBody)
    }
    catch (e) {
        res.status(400).json({ error: e.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const fetchedTasks = await tasksModel.find()
        res.status(200).json({ tasks: fetchedTasks })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let queriedTask = req.params.id
        let searchedTask = '';
        if (mongoose.isValidObjectId(queriedTask)) {
            // console.log(true)
            searchedTask = await tasksModel.findOne({ _id: queriedTask })
        }
        // console.log(searchedTask)
        if (searchedTask) {
            return res.status(200).json(searchedTask)
        }
        else return res.status(404).json({ error: "There is no task at that id" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        let queriedTask = req.params.id
        if (mongoose.isValidObjectId(queriedTask)) {
            await tasksModel.deleteOne({ _id: queriedTask })
        }
        return res.status(204).json()
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let queriedTask = req.params.id
        if (mongoose.isValidObjectId(queriedTask)) {
            await tasksModel.deleteOne({ _id: queriedTask })
        }
        return res.status(204).json()
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.delete('/', async (req, res) => {
    try {
        let arrOfObjs = req.body.tasks
        let arrOfIds = []
        for (const obj of arrOfObjs) {
            if (mongoose.isValidObjectId(obj.id)) {
                arrOfIds.push(obj.id)
            }
        }
        console.log(arrOfIds)
        await tasksModel.deleteMany({ _id: arrOfIds })
        return res.status(204).json()
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        let queriedTask = req.params.id
        let searchedTask = '';
        let updatedValues = req.body
        if (mongoose.isValidObjectId(queriedTask)) {
            searchedTask = await tasksModel.findOneAndUpdate(
                { _id: queriedTask }, { $set: updatedValues })
        }
        if (searchedTask) {
            return res.status(204).json(searchedTask)
        }
        else return res.status(404).json({ error: "There is no task at that id" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})








module.exports = router
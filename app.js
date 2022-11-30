const express = require('express')
const app = express()
const tasksRouter = require('./routes/tasksRoute.js')


app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.use('/v1/tasks', tasksRouter)

app.get('/', (req, res)=>{
    res.send("ALL Ok.")
})


module.exports = app
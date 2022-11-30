require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')


const port = process.env.PORT || 5001
const db_url = process.env.DATABASE_URL

mongoose.connect(db_url, () => {
    console.log('connected to DB')
    app.listen(port, () => {
        console.log(`server is live at port :: ${port}`)
    })
})
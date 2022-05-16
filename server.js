const express = require('express')
const app = express()

require('dotenv').config()

const mongoose = require('mongoose')
const user = require('./models/user')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('conected to db'))

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})


// CRUD Operation API

// C - Create User
// R - Read 
//         Read details of all users
//         Read details of particular user
// U - Update user Details
// D - Delete user
const express = require('express')
const User = require('../models/user')
const router = express.Router()

//getting all
router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        res.json(users) 
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

//getting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//Creating one
router.post('/', async(req, res) => {
    const User1 = new User({
        name: req.body.name,
        userName: req.body.userName,
        age: req.body.age,
        dob: req.body.dob
    })
    try{
        const newUser = await User1.save()
        res.status(201).json(newUser)
    } catch(err){       
        res.status(400).json({message: err.message})
    }
})

//updating one
router.patch('/:id', getUser, async(req, res) => {
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.userName != null){
        res.user.UserName = req.body.userName
    }
    if(req.body.age != null){
        res.user.age = req.body.age
    }
    if(req.body.dob != null){
        res.user.dob = req.body.dob
    }

    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(400).json({message : err.message})
    }
})

//deleting one
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({ message: 'deleted user'})
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: "cannot find user"})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

module.exports = router
const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

usersRouter.get('/', async(request, response) => {
    const Users = await User.find({})
    return response.status(200).json(Users)
})
usersRouter.get('/:id', async(request, response) => {
    const user = await User.findById(request.params.id)

    if(!user){
        return response.status(404).json({error:`id of ${request.params.id} not found`})
    }
    response.status(200).json(user)
})

usersRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body

    if(!username || !name || !password){
        return response.status(400).json({error: "username, name, password required"})
    }
    else if(!(password.length >= 3)){
        return response.status(400).json({error:"Password must be longer than 3 characters or more"})
    }

    const saltRound = process.env.NODE_ENV === 'test' ? 1 : 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const Users = new User({
        username,
        name,
        passwordHash: passwordHash
    })
    const savedUser = await Users.save()

    response.status(201).json(savedUser)
})
usersRouter.delete('/:id', async(request, response) => {
    const user = await User.findByIdAndDelete(request.params.id)

    if(!user){
        return response.status(404).json({error: `id of ${request.params.id} not found`})
    }
    return response.status(200)
})

module.exports =  usersRouter
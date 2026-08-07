require('dotenv').config()
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

loginRouter.get('/', async(request, response) => {
    response.status(200).json({message: "WELCOME"})
})

loginRouter.post('/', async (request, response, next) => {
    const { username, password } = request.body

    const user = await User.findOne({username})
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if(!(passwordCorrect && user)){
        return response.status(404).json({error: "Username or Password Incorrect"})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return response.status(200).send({token, username: user.username, name: user.name})
})
module.exports = loginRouter
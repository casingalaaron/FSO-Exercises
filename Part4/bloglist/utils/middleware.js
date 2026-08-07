require('dotenv').config()
const logger = require('../utils/logger')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method', request.method)
    logger.info('Method', request.path)
    logger.info('Method', request.body)
    logger.info('------')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).json({error:'Unknown Endpoint'})
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}
const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    request.user = user

    next()
}
const errorHandler = (error, request, response, next) => {

    if(error.name === 'CastError'){
        response.status(404).json({error : 'malformatted id'})
    }
    else if(error.name === 'ValidationError'){
        response.status(400).json({error : error.message})
    }
    else if(error.name === "MongoServerError" && error.message.includes('E11000 duplicate key error')){
        response.status(400).json({error: "Username is already taken"})
    }
    else if(error.name === "JsonWebTokenError"){
        response.status(401).json({error: "Invalid Token"})
    }
    else if(error.name === "TokenExpiredError"){
        response.status(401).json({error: "Token expired"})
    }

    next(error)
}

module.exports = {requestLogger, tokenExtractor,  userExtractor, unknownEndpoint, errorHandler}

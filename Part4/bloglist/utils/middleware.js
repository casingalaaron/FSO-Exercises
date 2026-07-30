const logger = require('../utils/logger')

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
const errorHandler = (error, request, response, next) => {

    if(error.name === 'CastError'){
        response.status(404).json({error : 'malformatted id'})
    }
    else if(error.name === 'ValidationError'){
        response.status(400).json({error : error.message})
    }

    next(error)
}

module.exports = {requestLogger,  unknownEndpoint, errorHandler}
const express = require('express')
const mongoose = require('mongoose')
const BlogsRouter = require('./controller/Blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose.
connect(config.MONGO_URI, { family: 4 })
.then(() => {
  logger.info("Connected to MongoDB")
})
.catch(error => {
  logger.info("error: ", error)
})

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', BlogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

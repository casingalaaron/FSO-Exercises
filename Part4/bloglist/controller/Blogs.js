const BlogsRouter = require('express').Router()
const Blog = require('../models/blog')

BlogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

BlogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})
BlogsRouter.delete('/:id', (request, response) => {

  Blog.findByIdAndDelete(request.params.id)
  .then(success => {
    if(success){
      return response.status(204).end()
    }
    else{
      return response.status(404).json({error:`id of ${request.params.id} not found`})
    }
  })
})

module.exports = BlogsRouter
const BlogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')

BlogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

BlogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  if(blog){
    return response.status(200).json(blog)
  }
  else{
    return response.status(404).json({error: `id of ${request.params.id} Not found`})
  }
})

BlogsRouter.post('/', async (request, response) => {
  if(!request.body.title || !request.body.url ){
    return response.status(400).json({error: "title and url required"})
  }
  else{
    const blog = new Blog(request.body)
    await blog.save()
    return response.status(201).json(blog)
  }
  

})

BlogsRouter.delete('/:id', async (request, response) => {
  const deleteBlog = await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

BlogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: 1 } },
    { returnDocument: 'after' },
  )

  response.status(200).json(updatedBlog)
})


module.exports = BlogsRouter
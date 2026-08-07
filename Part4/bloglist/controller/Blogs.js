require('dotenv').config()
const middleware = require('../utils/middleware')
const BlogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonWebToken')

BlogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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

BlogsRouter.post('/', middleware.userExtractor ,async (request, response) => {

  if(!request.body.title || !request.body.url ){
    return response.status(400).json({error: "title and url required"})
  }
  const body = request.body
  const user = request.user
  
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
  })
  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  
  return response.status(201).json(newBlog)
})

BlogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(!blog){
    return response.status(404).json({
      error: `blog id of ${request.params.id} not found`
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(decodedToken.id !== blog.user.toString()){
    return response.status(403).json({
      error: "You're forbidden to delete this blog"
    })
  }

  await Blog.findByIdAndDelete(request.params.id)
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

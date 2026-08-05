const Blog = require('../models/blog')

const initialBlogs = [
    
  {
    "title": "The Art of Clean Code",
    "author": "Jane Doe",
    "url": "https://example.com",
    "likes": 1240
  },
  {
    "title": "Mastering React in 2026",
    "author": "John Smith",
    "url": "https://example.com",
    "likes": 852
  },
  {
    "title": "Understanding Async/Await",
    "author": "Alice Johnson",
    "url": "https://example.com",
    "likes": 2301
  },

]

const NonExistingId = async () => {
    const blogObject = new Blog(
        {
            "title": "The Art of Clean Code",
            "author": "Jane Doe",
            "url": "https://example.com",
            "likes": 1240
        }
    )
    await blogObject.save()
    await blogObject.deleteOne()

    return blogObject._id.toString()
}

const blogsInDB = async () => {
    const Blogs = await Blog.find({})
    return Blogs.map(blog => blog.toJSON())
}

module.exports = {initialBlogs, NonExistingId, blogsInDB}
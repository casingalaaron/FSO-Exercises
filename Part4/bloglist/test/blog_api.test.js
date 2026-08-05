const assert = require("node:assert")
const { test, after, beforeEach, describe} = require("node:test")
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const helper = require('../test/test_helper')

beforeEach( async () => {
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})
describe("Get request", () => {

test("all blogs are returned", async() => {
    const response = await api.get('/api/blogs')
    assert.deepEqual(response.body.length, helper.initialBlogs.length)
})

test("blogs id fields are named as id and not _id", async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert(blog.hasOwnProperty('id'))
})
})

describe("Post request", () => {


test("A blog can be added", async() => {
    const blog = {
        "title": "Mastering React in 2026",
        "author": "John Smith",
        "url": "https://example.com",
        "likes": 852
    }

    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-type',/application\/json/)

    const Blogs = await helper.blogsInDB()

    assert.deepEqual(Blogs.length, helper.initialBlogs.length + 1)
})

test("A blog without title and url returns code 400", async() => {
    const invalidBlog = {likes:55, author:"John Lee"}
    
    await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400)

    const response = await api.get('/api/blogs')
    const blog = response.body

    assert.deepEqual(blog.length, helper.initialBlogs.length)
})
})

describe("Delete request", () => {
test("Deleting valid ID will return code 204 ", async () => {
    const newBlog = new Blog(
        {
            "title": "Mastering React Design Patterns",
            "author": "John Smith",
            "url": "https://example.com",
            "likes": 845
        }
    )
    await newBlog.save()

    await api
    .delete(`/api/blogs/${newBlog.id}`)
    .expect(204)

    const Blogs = await api
    .get('/api/blogs')
    .expect(200)

    assert.deepEqual(Blogs.body.length, helper.initialBlogs.length)
})

test("Deleting an invalid ID will return code 404", async () => {
    const fakeID = '5435463432'

    await api
    .delete(`/api/blogs/${fakeID}`)
    .expect(404)
    .expect({error: 'malformatted id'})

    const Blogs = await api
    .get('/api/blogs')

    assert.deepEqual(Blogs.body.length, helper.initialBlogs.length)
})
})

describe("Put request", () => {


test("Requesting put method will increment likes into 1", async () => {
    const Blogs =  await api.get('/api/blogs')
    const {id} = Blogs.body[0]
    const originalLikes = Blogs.body[0].likes

    const blog = await api
    .put(`/api/blogs/${id}`)
    .expect(200)

    assert.strictEqual(blog.body.likes, (originalLikes) + 1)
})
})
after(() => {
    mongoose.connection.close()
})

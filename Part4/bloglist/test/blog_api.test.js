require('dotenv').config()
const assert = require("node:assert")
const { test, after, beforeEach, describe} = require("node:test")
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const app = require('../app')
const User = require('../models/users')
const Blog = require('../models/blogs')

const api = supertest(app)
const helper = require('../test/test_helper')

beforeEach( async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for(let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

    for(let user of helper.initialUsers){
        let userObject = new User(user)
        await userObject.save()
    }
})
describe("Get request for BLOGS API", () => {

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

describe("Post request for BLOGS API", () => {
    test("A blog can be added", async() => {

        const newUser = {
            username: "Test123",
            name: "Test Admin",
            password: "secret123"
        }

        const user = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect("content-type",/application\/json/)

        const loggedIn = await api
        .post('/login')
        .send({username: "Test123", password: "secret123"})
        .expect(200)
        
        const newBlog = {
            "title": "Mastering React in 2026",
            "author": "John Smith",
            "url": "https://example.com",
            "likes": 852
        }

        const blog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loggedIn.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-type',/application\/json/)

        const Blogs = await helper.blogsInDB()

        assert.deepEqual(Blogs.length, helper.initialBlogs.length + 1)
    })

    test("A blog without title and url returns code 400", async() => {
        
        const newUser = {
            username: "Test123",
            name: "Test Admin",
            password: "secret123"
        }

        const user = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect("content-type",/application\/json/)

        const loggedIn = await api
        .post('/login')
        .send({username: "Test123", password: "secret123"})
        .expect(200)

        const invalidBlog = {likes:55, author:"John Lee"}
        
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loggedIn.body.token}`)
        .send(invalidBlog)
        .expect(400)

        const response = await api.get('/api/blogs')
        const blog = response.body

        assert.deepEqual(blog.length, helper.initialBlogs.length)
    })
})

describe("Delete request for BLOGS API", () => {
test("Deleting valid ID will return code 204 ", async () => {
    const newUser = {
            username: "Test123",
            name: "Test Admin",
            password: "secret123"
    }

    const user = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect("content-type",/application\/json/)

    const loggedIn = await api
    .post('/login')
    .send({username: "Test123", password: "secret123"})
    .expect(200)
    
    const newBlog = {
        "title": "Mastering React in 2026",
        "author": "John Smith",
        "url": "https://example.com",
        "likes": 852
    }

    const blog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loggedIn.body.token}`)
    .send(newBlog)
    .expect(201)

    await api
    .delete(`/api/blogs/${blog.body.id}`)
    .set('Authorization', `Bearer ${loggedIn.body.token}`)
    .expect(204)

    const Blogs = await api
    .get('/api/blogs')
    .expect(200)

    assert.deepEqual(Blogs.body.length, helper.initialBlogs.length)
})

test("Deleting an invalid ID will return code 404 ", async () => {
    const newUser = {
            username: "Test123",
            name: "Test Admin",
            password: "secret123"
    }

    const user = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect("content-type",/application\/json/)

    const loggedIn = await api
    .post('/login')
    .send({username: "Test123", password: "secret123"})
    .expect(200)

    const fakeID = '5435463432'

    await api
    .delete(`/api/blogs/${fakeID}`)
    .set('Authorization', `Bearer ${loggedIn.body.token}`)
    .expect(404)
    .expect({error: 'malformatted id'})

    const Blogs = await api
    .get('/api/blogs')

    assert.deepEqual(Blogs.body.length, helper.initialBlogs.length)
})
})

describe("Put request for BLOGS API", () => {


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

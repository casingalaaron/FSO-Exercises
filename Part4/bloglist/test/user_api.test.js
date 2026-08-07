const assert = require('node:assert')
const {test, describe, after, before, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const app = require('../app')
const User = require('../models/users')
const config = require('../utils/config')

const api = supertest(app)

before(async () => {
    await mongoose.connect(config.MONGO_URI, { family: 4 })
})

beforeEach( async () => {
    await User.deleteMany({})

    for(let user of helper.initialUsers){
        let newUser = new User(user)
        await newUser.save()
    }
})
describe("GET Request for USERS API", () => {
    test("users are retured as json", async() => {
        await api.get('/api/users')
        .expect(200)
        .expect('content-type', /application\/json/)
    })
    test("all users are returned", async () => {
        const users = await api.get('/api/users')
        assert.deepStrictEqual(users.body.length, helper.initialUsers.length)
    })
    test("returned users do not expose passwordHash", async() => {

        const users = await api
        .get(`/api/users`)
        .expect(200)
        .expect('content-type', /application\/json/)

        assert(users.body.every(user => !Object.hasOwn(user,'passwordHash')))
        users.body.forEach(user => assert.strictEqual(user.passwordHash, undefined))
    })
})
describe("POST Request for USERS API", () => {
    test("Undefined or missing username will note be created", async() => {
        const user = {
            username: undefined,
            name : "Alexander Cruz",
            password: "smhWitty123"
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect({error: "username, name, password required"})
        
        const UsersInApi = await api.get('/api/users')

        assert.deepStrictEqual(UsersInApi.body.length, helper.initialUsers.length)
    })
    test("Undefined or missing name will note be created", async() => {
        const user = {
            username: "Alexander34",
            name : undefined,
            password: "smhWitty123"
        }
        
        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect({error: "username, name, password required"})

        const UsersInApi = await api.get('/api/users')

        assert.deepStrictEqual(UsersInApi.body.length, helper.initialUsers.length)
    })
    test("Undefined or missing password will not be created", async () => {
        const user = {
            username: "Alexander34",
            name : "Alexander Cruz",
            password: undefined,
        }
        
        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect({error: "username, name, password required"})

        const UsersInApi = await api.get('/api/users')

        assert.deepStrictEqual(UsersInApi.body.length, helper.initialUsers.length)
    })
    test("Username length shorter than 2 will throw an error and will not be created", async() => {
        const user = {
            username: "Al",
            name : "Alexander Cruz",
            password: "smhWitty123",
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect({error: "User validation failed: username: Username must not be shorter than 3 characters"})

        const UsersInApi = await api.get('/api/users')

        assert.deepStrictEqual(UsersInApi.body.length, helper.initialUsers.length)
    } )
    test("Password length shorter than 2 will throw an error and will not be created", async() => {
        const user = {
            username: "Alexander34",
            name : "Alexander Cruz",
            password: "ts",
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect({error: "Password must be longer than 3 characters or more"})

        const UsersInApi = await api.get('/api/users')

        assert.deepStrictEqual(UsersInApi.body.length, helper.initialUsers.length)
    })
    test("Existing Username will throw an error that it was taken", async() => {
        const user = {
            username: "juan_dev",
            name: "Juan Dela Cruz",
            password:"smhWitty123"
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect({error: "Username is already taken"})
    })
})

after( () => {
    mongoose.connection.close()
})

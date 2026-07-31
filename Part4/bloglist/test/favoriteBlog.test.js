const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite', () => {
    const oneBlog = [
        {
            id: 5,
            likes: 100
        }
    ]
    const mockData1 = [
        {id:1, likes:5},
        {id:2, likes:10},
        {id:3, likes:28},
        {id:4, likes:3},
        {id:5, likes:13},
        {id:6, likes:13},
        {id:7, likes:5}
    ]
    const mockData2 = [
        {id:1, likes:5},
        {id:2, likes:10},
        {id:3, likes:20},
        {id:4, likes:3},
        {id:5, likes:20},
        {id:6, likes:18},
        {id:7, likes:20}
    ]
    test("with zero blog", () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([]), null)
    })
    test("with one blog", () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(oneBlog), {id:5, likes:100})
    })
    test("with multiple blogs", () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(mockData1), {id:3, likes:28})
    })
    test("with multiple blog of same likes accumulated", () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(mockData2),{id:7, likes:20})
    })
})
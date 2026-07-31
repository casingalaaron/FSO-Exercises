const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const oneBlog = [{   
    id: 1 , 
    title: "How-To: How to Automatically Save Your First ₱100,000 in 6 Months", 
    author: "Francisco Garcia", 
    likes: 25,
}]
const multipleBlog = [
     {
    id: 1,
    title: 'React Basics',
    author: 'Michael Chan',
    likes: 7
  },
  {
    id: 2,
    title: 'Node.js Guide',
    author: 'Robert C. Martin',
    likes: 5
  },
  {
    id: 3,
    title: 'MongoDB Intro',
    author: 'Michael Chan',
    likes: 10
  },
  {
    id: 4,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    likes: 15
  },
  {
    id: 5,
    title: 'Express Middleware',
    author: 'Robert C. Martin',
    likes: 12
  },
  {
    id: 6,
    title: 'Functional JavaScript',
    author: 'Edsger W. Dijkstra',
    likes: 20
  },
  {
    id: 7,
    title: 'Algorithms',
    author: 'Edsger W. Dijkstra',
    likes: 8
  }
]

describe("Most Likes ", () => {
    test("with empty blog is zero", () => {
        assert.deepStrictEqual(listHelper.mostLikes([]), 0)
    })
    test("with one blog", () => {
        assert.deepStrictEqual(listHelper.mostLikes(oneBlog),{author: "Francisco Garcia", likes: 25})
    })
    test("with multiple blogs", () => {
        assert.deepStrictEqual(listHelper.mostLikes(multipleBlog), { author: 'Robert C. Martin', likes: 32 })
    })
})
const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog = (blogs) => {

    if(blogs.length === 0){
        return null
    }

    return blogs.reduce((favorite, blog) => {
        return favorite.likes > blog.likes ? favorite : blog
    })
}
const mostBlog = (blogs) => {
    if(blogs.lenght === 0){
        return null
    }
    const blogAuthors = []

    blogs.forEach(blog => {
        const existingAuthor = find(author => author.author === blog.author)

        if(existingAuthor){
            blogAuthors.blogs++
        }
        else{
            blogAuthors.push(
                {author: blog.author, blogs:1}
            )
        }
    })

    return blogAuthors.reduce((most, current) => {
        return most.blogs > current.blogs ? most : current
    })
}
const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }

    const bloggersCollection = []

    blogs.forEach(blog => {
        const existingAuthors = bloggersCollection.find(author => author.author === blog.author)

        if(existingAuthors){
            existingAuthors.likes += blog.likes
        }
        else{
            bloggersCollection.push({
                author: blog.author, likes: blog.likes}
            )
        }
    })
    return bloggersCollection.reduce((most, current) => most.likes > current.likes ? most : current)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostLikes }
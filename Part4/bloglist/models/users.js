const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        minLength: [3, "Username must not be shorter than 3 characters"],
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        minLength : [3, "Password must be longer than 3 characters or more"],
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})


module.exports =  mongoose.model('User', userSchema)
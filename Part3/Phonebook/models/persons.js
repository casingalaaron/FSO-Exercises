require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

console.log("Connecting to MongoDB")
mongoose.connect(uri, { family: 4 }).
then(() => {
    console.log('Connected to MongoDB')
})
.catch(error => {
    console.log(error)
})

const personSchema = new mongoose.Schema({
    'name': String,
    'number' : String
})

personSchema.set('toJSON', {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)


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
    'name': {
        type: String,
        minLength: 3,
        required : true
    },
    'number' : {
        type : String,
        minLength: [8, "Minimum length of number must be 8"],
        validate : {
            validator : function(v){
                return /^\d{2,3}-\d+$/.test(v)
            },
            message : props => `${props.value} is not a valid phone number format` 
        },
        required : [true, "Phone Number are required"]
    }
})

personSchema.set('toJSON', {
    transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
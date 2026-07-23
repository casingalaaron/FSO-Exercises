const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/persons')

const PORT = 3001
app.use(express.json())
morgan.token('body', (req, res) => {
    if(req.method === 'POST')
        return res.json(req.body)
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body '))
app.use(express.static('dist'))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, req, res, next) => {
    const id = req.params.id
    console.log(error)

    if(error.name === 'CastError'){
        return res.status(404).json({'error': `id of ${id} not found`})
    }
    else if(error.name === 'ValidationError'){
        return res.status(400).json({error: error.message})
    }

    next(error)
}
const validatePerson = (req, res, next) => {
    const body = req.body

    if(!body.name || !body.number){
        return res.status(400).json({
            'error': "name or number are missing"
        })
    }
    next()
}

app.get('/api/persons', (req, res, next) => {
    Person
    .find({})
    .then(persons => {
        res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
    const personQuantity = Person.length
    const now = new Date()
    res.send(`<p>Phonebook has info for ${personQuantity} people</p><p>${now}</p>`)
})
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    
    Person
    .findById(id)
    .then(person => {
        res.json(person)
    })
    .catch(error => {
        next(error)})
})
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    
    Person
    .findByIdAndDelete(id)
    .then(deletedPerson => {
        res.json({'message' : `Successfully deleted ${deletedPerson.name}.`})
    })
    .catch(error => next(error))
})

app.post('/api/persons', validatePerson, (req, res, next) => {
    const body = req.body

    Person
    .findOne({'name' : body.name})
    .then(person => {
        if(person){
            return res.status(409).json({'error': "name must be unique"})
        }
        else {
             Person.create({
                "name" : body.name,
                "number" : body.number
            })
            .then(newPerson => {
                res.json(newPerson)
            })
            .catch(error => {
                console.log(error)
                next(error)
            })
        }
    })
    .catch(error => next(error))
})

app.patch('/api/persons/:id', (req, res, next) => {
    const body = req.body

    Person
    .findOneAndUpdate({'name': body.name}, {$set:{'number': body.number}}, {returnDocument: 'after'})
    .then(updatedPerson => {
        res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)
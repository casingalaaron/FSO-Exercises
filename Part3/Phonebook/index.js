const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/persons')

const PORT = 3001
app.use(express.json())
app.use(cors())
morgan.token('body', (req, res) => {
    if(req.method === 'POST')
        return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body '))
app.use(express.static('dist'))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (req, res) => {
    Person
    .find({})
    .then(persons => {
        res.json(persons)
    })
    .catch(error => {
        res.status(404).json({'error' : error})
    })
})

app.get('/api/info', (req, res) => {
    const personQuantity = Person.length
    const now = new Date()
    res.send(`<p>Phonebook has info for ${personQuantity} people</p><p>${now}</p>`)
})
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Person
    .findById(id)
    .then(person => {
        res.json(person)
    })
    .catch(error => {
        res.status(404).json({'error': `id of ${id} not found`})
    })
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Person
    .findByIdAndDelete(id)
    .then(deletedPerson => {
        res.json({'message' : `Successfully deleted ${deletedPerson.name}.`})
    })
    .catch(() => {
        res.status(404).json({'error': `id of ${id} not found`})
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body || !body.name || !body.number){
        return res.status(400).json({'error': "name or number are missing"})
    }

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
                return res.json(newPerson)
            })
        }
    })
})

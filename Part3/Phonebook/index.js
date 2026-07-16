const express = require('express')
const app = express()

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(data)
})

app.get('/api/info', (req, res) => {
    const personQuantity = data.length
    const now = new Date()
    res.send(`<p>Phonebook has info for ${personQuantity} people</p><p>${now}</p>`)
})
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(something => something.id === id)

    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.filter(someone => someone.id !== id)

    res.status(200).end()
    res.send(JSON.stringify(person))
})
app.post('/api/persons', (req, res) => {
    const person = req.body
    res.JSON(person)
})
const express = require('express')
const app = express()

const PORT = 3001
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let data = [
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
    res.json(data)
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
    const person = data.find(item => item.id === id)
    
    if(!person){
        res.status(404).json(
            { "error": "Person not found"}
        )
    }
    data = data.filter(person => person.id !== id)

    res.status(200).json(data)
})

const generateID = () => {
    const maxID = data.length > 0 ? Math.max(...data.map(item => Number(item.id))) : 0
    return String(maxID + 1)
}
app.post('/api/persons', (req, res) => {
    const body = req.body
    const existingName = data.map(item => item.name)

    if(!body || !body.name || !body.number){
        return res.status(400).json({'error': "name or number is missing"
        });
    }
    else if(existingName.includes(body.name)){
        return res.status(400).json({"error": "The name already exists in the phonebook"})
    }

    const person = {
        'name' : body.name,
        'number': body.number,
        'id': generateID()
    }

    data = data.concat(person)
    res.json(data)
})

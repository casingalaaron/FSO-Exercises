import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [input, setInput] = useState('')
  const handleInput = (event) => {
  setInput(event.target.value)
  }  

  useEffect(() => {
    axios
    .get('http://localhost:3002/persons')
    .then(response => {
      console.log("Promises fulfilled")
      setPersons(response.data)
    })
  }, [])

  return (
    <div>{persons.map((item) => console.log(item))}
      <h2>Phonebook</h2>
      <Filter input={input} handleInput={handleInput} />
      <h2>Add Person</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} input={input}/>
    </div>
  )
}

export default App
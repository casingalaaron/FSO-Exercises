import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './components/services/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {phonebookService.getAll().then(result => { 
    setPersons(result)})
  }, [])
  
  const handleInput = (event) => {
  setInput(event.target.value)
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={input} handleInput={handleInput} />
      <h2>Add Person</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} input={input}/>
    </div>
  )
}

export default App
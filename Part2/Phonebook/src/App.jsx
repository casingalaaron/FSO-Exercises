import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './components/services/phonebookService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [input, setInput] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {phonebookService.getAll().then(result => { 
    setPersons(result)})
  }, [])
  
  const handleInput = (event) => {
  setInput(event.target.value)
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
      message={notificationMessage}
      />
      <Filter 
      input={input} 
      handleInput={handleInput} 
      />
      <h2>Add Person</h2>
      <PersonForm 
      persons={persons} 
      setPersons={setPersons} 
      setNotificationMessage={setNotificationMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} 
      setPersons={setPersons} 
      input={input} 
      setNotificationMessage={setNotificationMessage}
      />
    </div>
  )
}

export default App
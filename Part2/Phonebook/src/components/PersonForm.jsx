import { useState } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebookService'

const PersonForm = ({persons, setPersons}) => {
    
    const [newName, setNewName] = useState('')
    const [newNumber, setnewNumber] = useState('')

    const handleNumber = (event) => {
      setnewNumber(event.target.value)
    }

    const handleNewName = (event) => {
      setNewName(event.target.value)
    }

    const AddPerson = (event) => {
    event.preventDefault()
    const isExisting = handleDuplicate(persons, newName)
    
    if(newName ==='' || newNumber ===''){
      alert("fill up all information before adding")
    }
    else{
      if(!isExisting){
        phonebookService
        .Create({name:newName, number: newNumber})
        .then(response => setPersons(persons.concat(response)))
      }
      else{
        alert(` ${newName} is already added to the phonebook`)
        setNewName('')
        setnewNumber('')
      }
    }
  }

  const handleDuplicate = (array,newName) => {
    return array.some(persons => persons.name === newName)
  }

    return(
        <form onSubmit={AddPerson}>
            <div>name: <input value={newName} onChange={handleNewName}/></div>
            <div>number: <input value={newNumber} onChange={handleNumber}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}
export default PersonForm
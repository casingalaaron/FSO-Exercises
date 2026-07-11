import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {
    
    const [newName, setNewName] = useState('')
    const [newNumber, setNewBumber] = useState('')

    const handleNumber = (event) => {
    setNewBumber(event.target.value)
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const AddPerson = (event) => {
    event.preventDefault()
    const isExisting = handleDuplicate(persons, newName)
    if(!isExisting){
      if(newName !=='' && newNumber !==''){  
        let latestId = persons.length
        const newObject = [...persons,{
        name: newName,
        number: newNumber,
        id: (latestId + 1)
        }]
        setPersons(newObject)
        setNewName('')
        setNewNumber('')
        }
      else{
        alert("fill up all information before adding")
      }
      }
    else{
      alert(` ${newName} is already added to the phonebook`)
      setNewName('')
    }
  }

  const handleDuplicate = (array,newName) => {
    const isExisting = array.map((item) => item.name === newName)
    const result = isExisting.includes(true)
    return result
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
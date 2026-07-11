import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number : '040-1234567' }]) 
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
      const newObject = [...persons,{
      name: newName,
      number: newNumber
    }]
    setPersons(newObject)
    setNewName('')
    setNewBumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        {persons.map((item,index) => <li key={index}>{item.name} {item.number}</li>)}
    </div>
  )
}

export default App
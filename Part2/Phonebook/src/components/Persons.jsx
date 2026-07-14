import phonebookService from "./services/phonebookService"

const Persons = ({persons, setPersons, input, setNotificationMessage}) => {
    const phonebookToShow = !input ?  persons : persons.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()) || item.number.includes(input))

    function handleDelete(id){
        const person = persons.find(item => item.id === id)
        if(window.confirm(`Delete ${person.name}?`)){
            phonebookService
            .Delete(id)
            .then(() => {
                setPersons(persons.filter((item) => item.id !== id))
                setNotificationMessage(`${person.name} are successfully deleted`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 3000)
            })
            .catch(error => {
                setNotificationMessage(`Information of ${person.name} has already been removed from server`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 3000)
                })
        }
    }

    return(
        <>
        {phonebookToShow.map((item) => <li key={item.id}>{item.name} {item.number}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>)}
        </>
    )
}
export default Persons
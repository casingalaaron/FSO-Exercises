const Persons = ({persons, input}) => {
    const phonebookToShow = !input ?  persons : persons.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()) || item.number.includes(input))

    return(
        <>
        {phonebookToShow.map((item,index) => <li key={item.id}>{item.name} {item.number}</li>)}
        </>
    )
}
export default Persons
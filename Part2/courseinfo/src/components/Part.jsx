const Part = ({part}) => {
    return(
        <>
        {part.map((item) => <p key={item.id}>{item.name}: {item.exercises}</p>)}
        </>
    )

}

export default Part
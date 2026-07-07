const Part = (props) => {
    console.log("Part: " + props)
    return(
        <>
        <p>{props.part.name}:  {props.part.amount}</p>
        </>
    )

}

export default Part
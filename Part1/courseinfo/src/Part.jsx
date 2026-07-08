const Part = (props) => {
    console.log("Part: " + props)
    return(
        <>
        <p>{props.content.name}:  {props.content.amount}</p>
        </>
    )

}

export default Part
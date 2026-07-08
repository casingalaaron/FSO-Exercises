const Part = ({props}) => {
    console.log("Props: " + props.name)

    return(
        <>
        <p>{props.name}:  {props.exercises}</p>
        </>
    )

}

export default Part
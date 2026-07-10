const Header = ({course}) => {
  return(
  <>
   <h1>{course.name}</h1>
  </>)
}
const Content = ({course}) => {
    return(
    <>
      <Part part={course.parts} />
    </>
    )
}
const Part = ({part}) => {
    return(
        <>
        {part.map((item) => <p key={item.id}>{item.name}: {item.exercises}</p>)}
        </>
    )
}
const Total = ({course}) => {
  return(
  <>
    <b>total of {course.parts.reduce((total, item) => total + item.exercises, 0)} exercises</b>
  </>
  )
}


const Course = ({course}) => {
    
    return(
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
} 
export default Course
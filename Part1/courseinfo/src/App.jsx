import Part from './Part.jsx'

const App = () => {
  const course = 'Half Stack application development'
  const part1 ={
    name : "Fundamentals of React",
    exercises: 10
  }
  const part2 = {
    name : "Using props to pass data",
    exercises: 7
  }
  const part3 = {
    name : "State of a component",
    exercises: 14
  }

  return(
    <div>
      <Header title={course} />
      <Content part1={part1} part2={part2} part3={part3}/> 
      <Total course={part1.exercises + part2.exercises + part3.exercises}/>
  </div>) 
}

const Header = (course) => {
  return(
  <>
   <h1>{course.title}</h1>
  </>)
}

  const Content = (props) => {
    console.log(props)
    return(
    <>
      <Part content={props.part1}/>
      <Part content={props.part2}/>
      <Part content={props.part3}/>
    </>
    )
  }

  const Total = (exercises) => {
  return(
  <>
    <p>total: {exercises.course}</p>
  </>
  )
}

export default App

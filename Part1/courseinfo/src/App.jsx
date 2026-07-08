import Part from './Part.jsx'

const App = () => {
  const course = 'Half Stack application development'
  const part = [
    {
      name : "Fundamentals of React",
      exercises: 10
    },
    {
      name : "Using props to pass data",
      exercises: 7
    },
    {
      name : "State of a component",
      exercises: 14
    }

  ]
  

  return(
    <div>
      <Header title={course} />
      <Content part={part}/> 
      <Total course={part}/>
  </div>) 
}

const Header = (course) => {
  return(
  <>
   <h1>{course.title}</h1>
  </>)
}

  const Content = ({parts}) => {
    return(
    <>
      <Part parts={parts[0]}/>
      <Part parts={parts[1]}/>
      <Part parts={parts[2]}/>
    </>
    )
  }

  const Total = ({course}) => {
  return(
  <>
    <p>total: {course.reduce((total, value) => total + value.exercises, 0)}</p>
  </>
  )
}

export default App

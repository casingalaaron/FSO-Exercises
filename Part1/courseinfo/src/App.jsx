import Part from './Part.jsx'

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

  }

  return(
    <div>
      <Header course={course} />
      <Content course={course}/> 
      <Total parts={course.parts}/>
  </div>) 
}

const Header = ({course}) => {
  return(
  <>
   <h1>{course.name}</h1>
  </>)
}

  const Content = ({course}) => {
    return(
    <>
      <Part part={course.parts[0]}/>
      <Part part={course.parts[1]}/>
      <Part part={course.parts[2]}/>
    </>
    )
  }

  const Total = ({parts}) => {
  return(
  <>
    <p>total: {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  </>
  )
}

export default App

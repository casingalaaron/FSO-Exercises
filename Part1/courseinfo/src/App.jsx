import Part from './Part.jsx'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const courseInfo = [
      
    {"name":part1, "amount": exercises1},
    {"name":part2, "amount": exercises2},
    {"name":part3, "amount": exercises3},
  ]

  return(
    
    <div>
      <Header title={course} />
      <Content course={courseInfo} />
      <Total course={courseInfo}/>
  </div>) 
}

const Header = (course) => {
  return(
  <>
   <h1>{course.title}</h1>
  </>)
}

  const Content = (props) => {
    return(
    <>
      <Part part={props.course[0]}/>
      <Part part={props.course[1]}/>
      <Part part={props.course[2]}/>
    </>
    )
  }

  const Total = (exercises) => {
  return(
  <>
    <p>total: {exercises.course[0].amount + exercises.course[1].amount + exercises.course[2].amount}</p>
  </>
  )
}

export default App

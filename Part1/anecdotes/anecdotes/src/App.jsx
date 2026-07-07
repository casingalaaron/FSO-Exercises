import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const courseInfo = [
    {"name":part1, "amount":exercises1},
    {"name":part2, "amount":exercises2},
    {"name":part3, "amount": exercises3}
  ]

  return(
    <div>
      <Header title={course} />
      <Content part={courseInfo} />
      <Total course={courseInfo}/>
  </div>)
}

const Header = (course) => {
  return(
  <>
   <h1>{course.title}</h1>
  </>)
}

  const Content = (courseInfo) => {
    
    return(
    <>
      <p>{courseInfo.part[0].name + ": " + courseInfo.part[0].amount} </p>
      <p>{courseInfo.part[1].name + ": " + courseInfo.part[1].amount} </p>
      <p>{courseInfo.part[2].name + ": " + courseInfo.part[2].amount} </p>
    </>
    )
  }

const Total = (exercises) => {
  console.log(exercises)
  console.log(exercises.course[0].amount)
  return(
  <>
    <p>total: {exercises.course[0].amount + exercises.course[1].amount + exercises.course[2].amount}</p>
  </>
  )
}

export default App

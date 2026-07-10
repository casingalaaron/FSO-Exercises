const Total = ({course}) => {
  return(
  <>
    <b>total of {course.parts.reduce((total, item) => total + item.exercises, 0)} exercises</b>
  </>
  )
}
export default Total
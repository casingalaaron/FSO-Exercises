import Part from './Part'

const Content = ({course}) => {
    return(
    <>
      <Part part={course.parts} />
    </>
    )
}
export default Content
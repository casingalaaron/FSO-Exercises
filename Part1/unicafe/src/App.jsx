import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const hasFeedback = good!==0 || neutral!==0 || bad!==0

  function handleGood(){
    setGood(good + 1)
  }
  function handleNeutral(){
    setNeutral(neutral + 1)
  }
  function handleBad(){
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      {!hasFeedback? <div>No feedback given</div> : <Statistics good={good} neutral={neutral} bad={bad} />}
      
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good + (bad * -1)) / total
  const positive = (good / total) * 100 + " %"

  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <StatisticLine value={good} text="Good"/>
        <StatisticLine value={neutral} text="Neutral"/>
        <StatisticLine value={bad} text="Bad"/>
        <StatisticLine value={total} text="Total" />
        <StatisticLine value={average} text="Average"/>
        <StatisticLine value={positive} text="Positives"/>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return(<>
  <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  </tbody>
  </>)
}

export default App

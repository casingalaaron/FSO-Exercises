import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <h1>Statistics</h1>
      Good:{good}<br/>
      Neutral: {neutral}<br/>  
      Bad: {bad}
    </div>
  )
}

export default App

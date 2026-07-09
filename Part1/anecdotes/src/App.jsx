import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  function randomNumber(){
    return (Math.floor(Math.random() * anecdotes.length));
  }
  const [index, setIndex] = useState(randomNumber)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const totalVotes = votes.reduce((total, index) => total + index)
  

  function handleIndex(){
    setIndex(randomNumber())
  }

  function handleVotes(){
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  return (
    <>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
      <button onClick={handleVotes}>Vote</button>
      <button onClick={handleIndex}>Next Anecdote</button>
      {totalVotes!==0 && <MostVote votes={votes} anecdotes={anecdotes} />}
    </>
  )
}

const MostVote = ({votes, anecdotes}) => {
  const highestVote = Math.max(...votes)
  const indexOfHighestVote = votes.indexOf(highestVote)

  return(
    <>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[indexOfHighestVote]}</p>
      <p>has {highestVote} votes</p>
    </>
  )
}


export default App

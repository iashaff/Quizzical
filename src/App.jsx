import './App.css'
import Start from './components/Start'
import Quizz from './components/Quizz'
import { useState } from 'react'

function App() {
  const [startQuizz, setStartQuizz] = useState(false)

  function startGame () {
    setStartQuizz(true)
  }

  return (
    
      startQuizz ? <Quizz /> : <Start startGame={startGame} />
    
  )
}

export default App

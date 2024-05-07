import { useState, useEffect } from "react"
import he from "he"
import Question from "./Question"
import { IoCloseCircleOutline } from "react-icons/io5";

export default function Quizz() {
     const [questions, setQuestions] = useState([]);
     const [newGame, setNewGame] = useState(false);
     const [correctAnswer, setCorrectAnswer] = useState()
     const [showResults, setShowResults] = useState(false)
     const [reloadPage, setReloadPage] = useState(false)

     function fetchData() {
      setReloadPage(true)         
         try {
             fetch('https://opentdb.com/api.php?amount=5')
             .then(res => res.json())
             .then(data => {
                const dataResult = data.results.map((questionsData, index) => {
                    /* Decoding data */
      
                      const decodedQuestion = he.decode(questionsData.question)
                      const decodedIncorrectAnswers = questionsData.incorrect_answers.map(answer => he.decode(answer)) 
                      const decodedCorrectAnswer = he.decode(questionsData.correct_answer)
      
                    /* Creating new array of all answers */
      
                      const allAnswersArr = [...decodedIncorrectAnswers, decodedCorrectAnswer]
           
                    /* Shuffling elements of array  */
               
                      allAnswersArr.sort(() => Math.random() -0.5)
      
                      return {
                        id: index,
                        question: decodedQuestion,
                        correctAnswer: decodedCorrectAnswer,
                        incorrectAnswer: decodedIncorrectAnswers,
                        answers: allAnswersArr,
                        selectedAnswer: '',
                      }
                })
                setQuestions(dataResult)
                setNewGame(true)
                setReloadPage(false)
             })
             
         } catch (err) {
            console.log('Error:', err)
            setReloadPage(false)
         } 
     }

     useEffect(() => {
        fetchData()
        setReloadPage(false)
     }, [newGame]) 

        /* Creating Question component with data props */

     const questionEl = questions.map((question, index) => {
      return <Question
          key={question.id}
          id={index}
          question={question}
          correctAnswer={question.correctAnswer}
          handleAnswerSelected={handleAnswerSelected}
          selectedAnswer={question.selectedAnswer}
          showResults={showResults}             
       />
   })
       
      /* Identifying which answer the user selected. */

      function handleAnswerSelected(event) {
        const {value, name} = event.target
        const id = parseInt(name)

        setQuestions(prevQuestion =>{
          return prevQuestion.map(item => {
            return item.id == id ? {...item, selectedAnswer: value} : item
          })
        })
      }
         
        /* Checking the correct answer and calculating the score. */

      function checkAnswers() {
        setShowResults(true)

        let count =  questions.filter(item => item.selectedAnswer === item.correctAnswer).length
        setCorrectAnswer(count)
      }

        /* Starting a new game */

      function startNewGame(){
          setShowResults(false)
          setCorrectAnswer()
          fetchData()
          setQuestions([])
          setNewGame(true)
      }

        /* Exit from Quizz to the Start page */

      function exitGame(){
          window.location.reload()
      }
     
    return (
        <div className="container">
        <IoCloseCircleOutline
        className="exit-btn"
         onClick={exitGame} />
        {!reloadPage ? questionEl : <h1>Geting new quiz</h1>}
         {!reloadPage && showResults ? (
            <div className='score'>
              <p>You scored <span>{correctAnswer}</span>/{questions.length} correct answers</p>
              <button className="btn play-btn" onClick={startNewGame}>Play again</button>
            </div>
         ) : (<button className="btn check-btn" onClick={checkAnswers}> Check answers
          </button> )}
        </div>
    )
}

import {nanoid} from 'nanoid'

export default function Question(props) {
    const { id, question, answers, correctAnswer, selectedAnswer} = props.question 

    const answerEl = answers.map((answer) => {

            /* Creating the values for checking the selected answer and the correct answer */
        const answerSelected = selectedAnswer === answer
        const isCorrect = selectedAnswer === correctAnswer

            /* Identifying styles for answers after displaying results.  */ 

        let classList = answerSelected ? 'selected' : ''
        
        if(props.showResults) {
            if(answerSelected && isCorrect){classList = 'correct-answer'}
            else if(answerSelected && !isCorrect){classList = 'incorrect-answer'}
            if(answer === correctAnswer) {classList = 'correct-answer'}
         
        }

        return(
        <label
            className={`answer-btn ${classList}`}
            key={nanoid()}>
        <input 
            type="radio"
            id={nanoid()}
            name={id}
            value={answer}
            onChange={props.handleAnswerSelected}
            checked={selectedAnswer === answer}
            disabled={props.showResults}
        />
            {answer}
        </label>
        )
     
    })

    return (
        <div className="question-block">
           <h2 className="title-question">{question}</h2>
            <div className="answers-block">
                {answerEl}
           </div>    
        </div>
    )
}
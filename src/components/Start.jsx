
export default function Start(props) {
    
    return (
        <div className="container">
            <h1>Quizzical</h1>
            <p className="description">Check your knowledge with a quiz.</p>
            <button className="btn start-btn" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}
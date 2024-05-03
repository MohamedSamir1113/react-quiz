function Progress({index,points,totalPoints,NumberOfQuestions}) {
    return (
        <header className="progress">
            <progress value={index} max={NumberOfQuestions}/>
        <p>Question {index+1}/<strong>{NumberOfQuestions}</strong></p>
          <p>{points}/<strong>{totalPoints}</strong> points</p>
        </header>
    )
}

export default Progress

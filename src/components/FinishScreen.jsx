function FinishScreen({points,dispatch,totalPoints,highScore}) {
    return (
        <>
        <div className="result">
            <span>Finished your Quiz your total score is {points} out of {totalPoints} possible points ({Math.ceil(points/totalPoints *100)}%) high score is:{highScore}</span>
            
        </div>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"startAgain"})}>start again</button>
        </>
    )
}

export default FinishScreen

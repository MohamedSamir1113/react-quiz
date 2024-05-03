
function StartScreen({ NumberOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz !</h2>
      <div>
        <h4 style={{display:"inline-block", marginRight:"3px"}}>Choose the number of questions </h4>
        <select
          onChange={(e) =>
            dispatch({ type: "choice", payload: Number(e.target.value) })
          }
          name=""
          id=""
        >
          {Array.from({ length: 15 }, (_, i) => (
            <option key={i}>{i + 1}</option>
          ))}
        </select>
      </div>
      <div>
        <h4 style={{display:"inline-block", marginRight:"3px"}}>Choose the difficulty of question </h4>
        <select
          onChange={(e) =>
            dispatch({ type: "difficulty", payload:String(e.target.value)})
          }
          name=""
          id=""
        >
          <option>easy</option>
          <option>medium</option>
          <option>hard</option>
        </select>
      </div>
      <h3>{NumberOfQuestions} questions to test your React mastery</h3>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        let's start!
      </button>
    </div>
  );
}

export default StartScreen;

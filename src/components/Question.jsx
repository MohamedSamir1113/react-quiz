import Options from "./Options";
import Timer from "./Timer";

function Question({ question, dispatch ,answer,secondsRemaining}) {
  
  return (
    <div>
      <h4>{question.question}</h4>
      <p></p>
      
      <Options dispatch={dispatch} answer={answer} question={question}/>

      <footer>
       <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>

      {answer!==null?<button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
          next
        </button>:""}
      </footer>
      
    </div>
  );
}

export default Question;

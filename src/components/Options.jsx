function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          key={i}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={answer !== null}
          className={`btn btn-option ${answer !== null?`${i === answer ? 'answer' : ''} ${i===question.correctOption?'correct':'wrong'}`:''}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

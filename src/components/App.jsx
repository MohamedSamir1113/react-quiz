import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = { questions: [], status: "loading", index: 0 ,answer:null ,points:0 ,highScore:0 , secondsRemaining:null,numberChoice:1,difficulty:"easy"};

function reducer(currState, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...currState, questions:action.payload, status: "ready" };
    case "dataFailed":
      return { ...currState, status: "error" };
    case "startQuiz":
      return { ...currState, status: "active" , secondsRemaining:currState.questions.length * 30 };
    case "choice":
      const numChoice = action.payload;
      return {...currState,numberChoice:numChoice}
    case "difficulty":
      return{...currState,difficulty:action.payload}
    case "next":
      if (currState.index >= currState.questions.length - 1) {
        return { ...currState, status: "finished" ,highScore:currState.points > currState.highScore?currState.points:currState.highScore};
      }
      return { ...currState, index: currState.index + 1 ,answer:null};
    case "newAnswer":
      const question=currState.questions[currState.index]
      return {...currState,answer:action.payload,points:question.correctOption===action.payload?currState.points + question.points:currState.points}
    case "startAgain":
      return {...initialState,questions:currState.questions,status:"ready"}
    case "tic":
      return {...currState,secondsRemaining:currState.secondsRemaining - 1,status:currState.secondsRemaining === 0?"finished":currState.status}
    default:
      throw new Error("shit happened in action sent from dispatch");
  }
}

function App() {
  const [{ questions, status, index , answer,points,highScore , secondsRemaining,numberChoice,difficulty}, dispatch] = useReducer(
    reducer,
    initialState
  );
  const NumberOfQuestions = numberChoice;
  const difficultyOfQuestions=difficulty
  const totalPoints=questions.reduce((sum,question)=> sum+ question.points,0)

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8002/questions");
        const data = await res.json();
        if(difficultyOfQuestions==="easy")
        {
          console.log(data.filter((question)=>question.points === 10));
        }
        else if(difficultyOfQuestions==="medium")
        {
          console.log(data.filter((question)=>question.points === 20));
        }
        else if(difficultyOfQuestions==="hard")
        {
          console.log(data.filter((question)=>question.points === 30));
        }
        

        //console.log(data.slice(0,NumberOfQuestions));
        dispatch({ type: "dataRecieved", payload: data.slice(0,NumberOfQuestions) });
        
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    getQuestions();
  }, [NumberOfQuestions,difficultyOfQuestions]);


  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            dispatch={dispatch}
            NumberOfQuestions={NumberOfQuestions}
          />
        )}
        {status === "active" && (
          <>
          
          <Progress index={index} points={points} NumberOfQuestions={NumberOfQuestions} totalPoints={totalPoints}/>
          <Question dispatch={dispatch} secondsRemaining={secondsRemaining} answer={answer} question={questions[index]} />
          </>
        )}
        {status === "finished" && <FinishScreen totalPoints={totalPoints} highScore={highScore} dispatch={dispatch} points={points}/>}
      </Main>
    </div>
  );
}

export default App;

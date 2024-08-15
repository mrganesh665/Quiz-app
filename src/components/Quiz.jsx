import { useState } from "react";
import { resultInitalState } from "./data";
import './Quiz.css'
import Timer from "./Timer";




  const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ansIndex, setAnsIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const { question, choices, correctAnswer } = questions[currentQuestion];
  const [showAnswerTimer,setShowAnswerTimer] = useState(true);

  const onAnsClick = (answer, index) => {
    setAnsIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnsIndex(null);
    setShowAnswerTimer(false);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers+ 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0); 
      setShowResult(true);
    }
   setTimeout(()=>{
    setShowAnswerTimer(true);
   });
  };
  const onTryAgain= ()=>{
    setResult(resultInitalState);
    setShowResult(false)
  }


  const handleTimeUp=()=>{
setAnswer(false);
onClickNext(false);
  };


  return (
    <div className="quiz-container">
    {!showResult ? ( 
       <div>
      { showAnswerTimer && <Timer duration={10} onTimeUp={handleTimeUp} />}
        <span className="active-ques">{currentQuestion + 1}</span>
        <span className="total-ques">/{questions.length}</span>
        <h2>{question}</h2>

        <ul>
          {choices.map((answer, index) => (
            <li
              onClick={() => {
                onAnsClick(answer, index);
              }}
              key={answer}
              className={ansIndex === index ? "selected-answer" : null}
            >
              {answer}
            </li>
          ))}
        </ul>

        <div className="footer">
          <button onClick={onClickNext} disabled={ansIndex === null}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>) :  <div className="result">
            <h3>Result</h3>
            <p>
                Total Questions : <span>{questions.length}</span>
                </p>
                <p>
                    Total Score : <span>{result.score}</span>
                </p>
                <p>
                   Correct answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                   Wrong answers: <span>{result.wrongAnswers}</span>
                </p>
                <button onClick={onTryAgain}>Try Again</button>
        </div>}
     
    </div>
  );
};
export default Quiz;

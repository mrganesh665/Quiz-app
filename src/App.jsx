import Quiz from "./components/Quiz"
import { queQuiz } from "./components/data";

function App() {
  return (<>
  <h1>Quiz App</h1>
  <Quiz questions={queQuiz.questions}/>
  </>
  );
}

export default App

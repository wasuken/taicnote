import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import QuestionArea from "./components/QuestionArea";
import AnswerList from "./components/AnswerList";
import Note from "./components/Note";

type Qa = {
  question: string;
  answer: string;
};

function App() {
  const [answers, setAnswers] = useState<Qa[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleClick = async (question: string) => {
    const [q, a]: string[] = await invoke("answer", { question });
    setAnswers([
      {
        question: q,
        answer: a,
      },
      ...answers,
    ]);
  };

  const onClear = () => {
    setAnswers([]);
    setDisabled(true);
  };

  return (
    <div className="container">
      <div className="left">
        <QuestionArea
          title={"Question"}
          onClick={handleClick}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      </div>
      <div className="right">
        <AnswerList title={"AnswerList"} onClear={onClear} answers={answers} />
      </div>
    </div>
  );
}

export default App;

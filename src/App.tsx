import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

type Qa = {
  question: string;
  answer: string;
};

function App() {
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Qa[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  function clear() {
    setAnswers([]);
  }

  async function getAnswer() {
    const [q, a]: string[] = await invoke("answer", { question });
    setAnswers([
      {
        question: q,
        answer: a,
      },
      ...answers,
    ]);
    setQuestion("");
  }

  return (
    <div className="container">
      <div className="left">
        <div className="left-top">
          <h3>質問入力</h3>
          <form className="row">
            <textarea
              className="question-area"
              onChange={(e) => {
                e.preventDefault();

                if (e.target.value.length > 0) setDisabled(false);
                setQuestion(e.target.value);
              }}
              value={question}
              placeholder="Enter a question..."
            ></textarea>
          </form>
          <div className="btnline">
            <button
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault();
                if (question.length <= 0) {
                  setDisabled(true);
                  return;
                }
                getAnswer();
              }}
            >
              Question
            </button>
          </div>
        </div>
        <div className="left-bottom">
          <h3>ノート</h3>
          <form className="row">
            <textarea
              className="note-area"
              placeholder="Enter note..."
            ></textarea>
          </form>
        </div>
      </div>
      <div className="right">
        {answers.length > 0 && (
          <div>
            <h3>質問、回答リスト</h3>
            {answers.length > 0 && (
              <div className="btnline">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    clear();
                  }}
                >
                  Clear
                </button>
              </div>
            )}
            <div className="answers">
              {answers.map((qa, i) => (
                <p key={i}>
                  <p>{qa.question}</p>
                  <div className="line"></div>
                  <p>{qa.answer}</p>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./index.css";

interface IProps {
  title: string;
  onClick: (contents: string) => Promise<void>;
  disabled: boolean;
  setDisabled: (v: boolean) => void;
}

function QuestionArea(props: IProps) {
  const { title, onClick, disabled, setDisabled } = props;
  const [question, setQuestion] = useState<string>("");

  return (
    <>
      <h3>{title}</h3>
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
          onClick={() => {
            if (question.length <= 0) return;
            onClick(question);
            setQuestion("");
          }}
        >
          Question
        </button>
      </div>
    </>
  );
}

export default QuestionArea;

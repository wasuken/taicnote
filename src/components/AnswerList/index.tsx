import { Qa } from "../types";
import "./index.css";

interface IProps {
  title: string;
  onClear: () => Promise<boolean>;
  answers: Qa[];
}

function AnswerList(props: IProps) {
  const { title, onClear, answers } = props;

  return (
    <>
      <div>
        <h3>{title}</h3>
        {answers.length > 0 && (
          <div className="btnline">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClear();
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
    </>
  );
}

export default AnswerList;

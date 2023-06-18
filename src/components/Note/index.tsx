import { useState } from "react";
import "./index.css";

interface IProps {
  title: string;
}
function App(props: IProps) {
  const { title } = props;
  return (
    <>
      <h3>{title}</h3>
      <form className="row">
        <textarea className="note-area" placeholder="Enter note..."></textarea>
      </form>
    </>
  );
}

export default App;

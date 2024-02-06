import { FC } from "react";
import "./WordChecker.css";
import React from "react";

type WordCheckerProps = {
  text: string;
  active: boolean;
  correct: boolean | null;
};
const WordChecker: FC<WordCheckerProps> = ({ text, active, correct }) => {
  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }
  if (active) {
    return <span className="active">{text} </span>;
  }
  return <span>{text} </span>;
};

export default React.memo(WordChecker);

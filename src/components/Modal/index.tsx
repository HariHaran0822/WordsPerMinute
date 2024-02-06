import React from "react";
import "./modal.css";

interface ModalProps {
  username: string;
  wpm: number;
  time: number;
  onClose: () => void;
  finished: boolean;
  incorrectWordCount: number;
  correctWordCount: number;
  accuracy: number;
}

const Modal: React.FC<ModalProps> = ({
  username,
  wpm,
  onClose,
  time,
  finished,
  correctWordCount,
  accuracy,
  incorrectWordCount,
}) => {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-content">
          <h1>{username} Scores</h1>
          <h2>
            {time > 0 && finished ? "Congragulation " : ""}
            {time === 0 ? "Sorry Your is Time Up" : " "}
          </h2>
          <p id="parag">Your WPM score: {wpm}</p>
          <p id="parag">Time remaining: {time}</p>
          <p id="parag">Total Correct Words: {correctWordCount}</p>
          <p id="parag">Total InCorrect Words: {incorrectWordCount}</p>
          <p id="parag">Accuracy: {accuracy.toFixed(1)}</p>
          <div className="bt-con">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

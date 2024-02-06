import React, { useState, useEffect } from "react";
import WordsPerMinute from "../WordsPerMinute/WordsPerMinute";
import WordChecker from "../WordChecker/WordChecker";
import TimerCard from "../TimerCard";
import "./WordGame.css";
import { sentence } from "../../Data/RandomSentence";
import Modal from "../Modal";

const WordGame: React.FC = () => {
  const [userInput, setUserInput] = useState<string>(" ");
  const [displaySentence, setDisplaySentence] = useState<string>(" ");
  const [activeWordIndex, setactiveWordIndex] = useState<number>(0);
  const [correctWord, setCorrectWord] = useState<any>([]);
  const [maxTimeLimit, setMaxTimeLimit] = useState<number>(60);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [playerWpm, setPlayerWpm] = useState<number>(0);
  const [correctWordCount, setCorrectWordCount] = useState<number>(0);
  const [incorrectWordCount, setIncorrectWordCount] = useState<number>(0);
  const [totalWordCount, setTotalWordCount] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);

  const handleTryAgain = () => {
    window.location.reload();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStarted) {
        if (maxTimeLimit === 0) {
          setIsFinished(true);
          setIsStarted(false);
          setShowModal(true);
          clearInterval(intervalId);
        } else {
          setMaxTimeLimit((prevState) => prevState - 1);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [maxTimeLimit, isStarted]);

  useEffect(() => {
    loadSentence();
  }, []);

  const loadSentence = () => {
    let sentenceIndex: number = Math.floor(Math.random() * sentence.length);
    setDisplaySentence(sentence[sentenceIndex]);
    setTotalWordCount(displaySentence.split(" ").length);
  };

  const handleWpm = (value: number) => {
    setPlayerWpm(value);
  };

  const handleInputCheck = (value: string) => {
    setIsStarted(true);
    if (value.endsWith(" ")) {
      const word = value.trim();
      const ind = displaySentence.split(" ")[activeWordIndex];

      if (word === ind) {
        setCorrectWordCount((prevState) => prevState + 1);
      } else {
        setIncorrectWordCount((prevState) => prevState + 1);
      }

      if (activeWordIndex === displaySentence.split(" ").length - 1) {
        setIsFinished(true);
        setIsStarted(false);
        setShowModal(true);
      }

      setactiveWordIndex((prevState) => prevState + 1);
      setUserInput("");

      if (word === ind?.trim()) {
        setCorrectWord((data: any) => {
          const newResult = [...data];

          newResult[activeWordIndex] =
            word === displaySentence.split(" ")[activeWordIndex];
          return newResult;
        });
      } else if (word !== ind?.trim()) {
        setCorrectWord((data: any) => {
          const newResult = [...data];
          newResult[activeWordIndex] = false;

          return newResult;
        });
      }
    } else {
      setUserInput(value);
    }
  };

  useEffect(() => {
    if (totalWordCount > 0) {
      const currentAccuracy =
        (correctWordCount / (correctWordCount + incorrectWordCount)) * 100 || 0;
      setAccuracy(currentAccuracy);
    }
  });

  return (
    <div className="main-container">
      <div
        className="u-name-container"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div className="u-name">
          Player : {localStorage.getItem("username")}
        </div>
      </div>
      <div className="game-container">
        {!isFinished && (
          <p className="sentence">
            {displaySentence.split(" ").map((words, i) => {
              return (
                <WordChecker
                  key={i}
                  text={words}
                  active={i === activeWordIndex}
                  correct={correctWord[i]}
                />
              );
            })}
          </p>
        )}

        {!isFinished && (
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInputCheck(e.target.value)}
          />
        )}
        {maxTimeLimit === 0 && <h1>Time Up !!!</h1>}
        {isFinished && maxTimeLimit > 0 && <h1>Well Done</h1>}

        <div className="counters">
          <div className="timers-section">
            <TimerCard title="Time Left" subtitle={maxTimeLimit} />
            <WordsPerMinute
              correctWord={correctWord.filter(Boolean).length}
              isStarted={isStarted}
              isFinished={isFinished}
              handleWpm={handleWpm}
            />
            <TimerCard title="Correct Word" subtitle={correctWordCount} />
            <TimerCard title="InCorrect Word" subtitle={incorrectWordCount} />
            <TimerCard title="Accuracy" subtitle={accuracy.toFixed(1)} />
          </div>
          <div>
            <button className="try-again" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        </div>
        {showModal && (
          <Modal
            username={localStorage.getItem("username") || ""}
            wpm={playerWpm}
            onClose={() => setShowModal(false)}
            time={maxTimeLimit}
            finished={isFinished}
            correctWordCount={correctWordCount}
            incorrectWordCount={incorrectWordCount}
            accuracy={accuracy}
          />
        )}
      </div>
    </div>
  );
};

export default WordGame;

import React from "react";
import { useEffect, useState } from "react";
import TimerCard from "../TimerCard";

type WordsPerMinuteProps = {
  correctWord: number;
  isStarted: boolean;
  isFinished: boolean;
  handleWpm: (value: number) => void;
};
const WordsPerMinute: React.FC<WordsPerMinuteProps> = ({
  correctWord,
  isStarted,
  isFinished,
  handleWpm,
}) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: any;
    if (!isFinished && isStarted) {
      intervalId = setInterval(() => {
        setTime((prevWpm) => prevWpm + 1);
        handleWpm;
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isStarted, isFinished]);

  useEffect(() => {
    const minutes = time / 60;
    const calculatedWpm = (correctWord / minutes).toFixed(2) || 0;

    handleWpm(Number(calculatedWpm));
  }, [correctWord, time, handleWpm]);

  const minutes = time / 60;
  return (
    <TimerCard title="WPM" subtitle={(correctWord / minutes).toFixed(2) || 0} />
  );
};

export default React.memo(WordsPerMinute);

import React, { useEffect, useState, useRef } from "react";
import "./Timer.css";

const Timer = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoaded((100 * counter) / duration);

    if (counter === duration) {
      clearInterval(intervalRef.current);
      onTimeUp();
    }
  }, [counter, duration, onTimeUp]);

  return (
    <div className="timer">
      <div
      style={{
        width:`${progressLoaded}%`,
        backgroundColor: `${
        progressLoaded < 40 ? 'lightgreen': 
         progressLoaded < 70 ? 'orange': 'red'
        }`
      }}
       className="progress"></div>
         <span className="time-count">{10-counter}</span>
    </div>
  
  );
};

export default Timer;

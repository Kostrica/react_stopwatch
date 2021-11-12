import React, { useState, useEffect, useMemo } from "react";
import cn from 'classnames';
import DoubleClickButton from "./DoubleClickButton";


export default function Stopwatch() {
  const [ stopwatchTime, setStopwatchTime ] = useState(0);
  const [ stopwatchIsActive, setStopwatchIsActive ] = useState(false);
  const [ isDoubleClick, setIsDoubleClick ] = useState(false);

  const formattedTime = useMemo(() => {
    const time = Number(stopwatchTime).toFixed(0);
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time - hours * 3600000) / 60000);
    const seconds = (time - hours * 3600000 - minutes * 60000) / 1000;

    if (hours >= 24) {
      return '1day+'
    }

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHours = hours < 10 ? `0${hours}` : hours;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }, [stopwatchTime]);

  const onDoubleClick = () => {
    if (stopwatchIsActive) {
      setStopwatchIsActive(false);
    }

    setIsDoubleClick(true);
  };

  const toggleStopwatch = () => {
    if (isDoubleClick) {
      setIsDoubleClick(false);
    } else {
      setStopwatchTime(0);
    }

    setStopwatchIsActive((prevStatus) => !prevStatus);
  }

  const resetStopwatch = () => {
    if (stopwatchTime) {
      setStopwatchTime(0);
      setStopwatchIsActive(true);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (stopwatchIsActive) {
        setStopwatchTime((prevTime) => prevTime + 1000);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [stopwatchIsActive]);

  return (
    <div className="stopwatch">
      <div className="scoreboard">
        {formattedTime}
      </div>
      <div className="control">
        <button
          className={cn(
            "button",
            {
              "button-start": !stopwatchIsActive,
              "button-stop": stopwatchIsActive
            }
          )}
          type="button"
          onClick={toggleStopwatch}
        >
          {stopwatchIsActive ? 'Stop' : 'Start'}
        </button>
        <DoubleClickButton
          className="button button-wait"
          title="Wait"
          delay={300}
          onDoubleClick={onDoubleClick}
        />
        <button
          className="button button-reset"
          type="button"
          onClick={resetStopwatch}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

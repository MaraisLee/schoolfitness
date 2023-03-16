import React, { useEffect, useState } from 'react';
const StopWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  let timer: any;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  });
  const restart = () => {
    setSeconds(0);
    setMinutes(0);
  };
  const stop = () => {
    clearInterval(timer);
  };
  return (
    <div className='timer-wrapper'>
      StopWatch
      <h1>
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </h1>
      <button onClick={restart}>ReStart</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
export default StopWatch;

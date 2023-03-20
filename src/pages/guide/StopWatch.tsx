import React, { useEffect, useState } from 'react';
const StopWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  let timer: any;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };
  const [time, setTime] = useState('00 : 00 : 00');

  const stop = () => {
    setIsRunning(false);
    const currentTime = `${hours < 10 ? '0' + hours : hours} : ${
      minutes < 10 ? '0' + minutes : minutes
    } : ${seconds < 10 ? '0' + seconds : seconds}`;
    console.log(`Time recorded: ${currentTime}`);
    setTime(currentTime);
  };
  // const stop = () => {
  //   setIsRunning(false);
  //   const time = `${hours < 10 ? '0' + hours : hours} : ${
  //     minutes < 10 ? '0' + minutes : minutes
  //   } : ${seconds < 10 ? '0' + seconds : seconds}`;
  //   console.log(`Time recorded: ${time}`);
  //   // 또는 기록을 배열 등의 자료구조에 추가하여 저장할 수도 있습니다.
  // };

  const restart = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(false);
  };

  // 시간 계산
  useEffect(() => {
    if (seconds === 60) {
      setMinutes(minutes => minutes + 1);
      setSeconds(0);
    }
    if (minutes === 60) {
      setHours(hours => hours + 1);
      setMinutes(0);
    }
  }, [seconds, minutes]);

  return (
    <div className=' text-center text-slate-600 p-2'>
      <h1 className='text-7xl font-bold mb-8 '>
        {hours < 10 ? '0' + hours : hours}:
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </h1>
      {!isRunning ? (
        <button
          onClick={start}
          className='px-6 py-2  ml-5 bg-[#ff8339] text-white rounded  hover:bg-gray-300'
        >
          Start
        </button>
      ) : (
        <button
          onClick={stop}
          className='px-6 py-2  ml-5 bg-gray-300 text-white hover:text-white rounded hover:bg-[#ff8339]'
        >
          Stop
        </button>
      )}
      <button
        onClick={restart}
        className='px-6 py-2  ml-5 bg-gray-300 text-white rounded hover:bg-[#ff8339]'
      >
        Restart
      </button>
      <p className='mt-5 ml-6 text-center'>
        Stop을 누르면 자동으로 기록됩니다.
      </p>
      <div>
        <h1>Timer</h1>
        <div id='time-display'>{time}</div>
        {/* ... */}
      </div>
    </div>
  );
};
export default StopWatch;

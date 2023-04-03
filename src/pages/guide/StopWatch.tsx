import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from 'api/axios';
import moment from 'moment';

type PropsType = {
  part: string;
  level: number;
};
const StopWatch = (prpos: PropsType) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  let timer: any;

  // 전송할 주소
  const [fetchUrl, setFetchUrl] = useState('');
  // fetUrl 관련 코드
  useEffect(() => {
    if (prpos.part === 'individual') {
      setFetchUrl('/exercise');
    } else if (prpos.part === 'weightguide') {
      setFetchUrl('/individualscore');
    }
  }, []);

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
  const [time, setTime] = useState('00:00:00');

  // 개인기록 조회
  const fetchData = async () => {
    // "isSeq": 0,   제외 예정
    // "isMiSeq": 1,            isMiSeq:회원 번호
    // "isEtSeq": 1,            isEtSeq: 운동 종류 번호
    // "isRegDt": "2023-03-21", isRegDt:기록 작성일
    // "isTime": "00:10:00"
    try {
      // 개인 기록 관리 연동
      // console.log('fetchUrl : ', fetchUrl);

      if (prpos.part === 'individual') {
        // execise 관련 코드
        // {
        //   "miSeq": 1,
        //   "etSeq": 5,
        //   "time":"00:00:10"
        // }

        const res = await instance.post(fetchUrl, {
          miSeq: 1,
          etSeq: prpos.level,
          time,
        });

        // console.log('individual fetchData Response : ', res);
      } else if (prpos.part === 'weightguide') {
        // {
        //   "isMiSeq": 0,
        //   "isEtSeq": 0,
        //   "isRegDt": "2023-03-28",
        //   "isTime": "00:00:10",
        //   "isWeek": 0
        // }
        const res = await instance.put(fetchUrl, {
          // isSeq: 0,
          isMiSeq: 1,
          // 운동 번호 프롭스로?
          isEtSeq: 17,
          isRegDt: moment(Date.now()).format('YYYY-MM-DD'),
          isTime: time,
          isWeek: 0,
        });

        // console.log('weightguide fetchData Response : ', res);
      }

      navigate('/detail');
    } catch (err: any) {
      console.log('fetchData Error : ', err);
    }

    // restart();
  };

  const stop = () => {
    setIsRunning(false);
    const currentTime = `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
    // console.log(`Time recorded: ${currentTime}`);
    // 서버로 현재 타임을 보내준다.
    setTime(currentTime);
  };
  useEffect(() => {
    if (time !== '00:00:00') fetchData();
  }, [time]);
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
      <h1 className='text-7xl font-bold mb-8'>
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
        <h1 className='text-2xl mt-3 font-bold  text-slate-500'>{time}</h1>
      </div>
    </div>
  );
};
export default StopWatch;

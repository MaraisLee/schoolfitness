import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from 'api/axios';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';

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
  // Recoil 사용자 정보
  const userInfo = useRecoilValue(userAtom);

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
    try {
      // 개인 기록 관리 연동

      if (prpos.part === 'individual') {
        const res = await instance.post(fetchUrl, {
          miSeq: userInfo.miSeq,
          etSeq: prpos.level,
          time,
        });
      } else if (prpos.part === 'weightguide') {
        const res = await instance.put(fetchUrl, {
          isMiSeq: userInfo.miSeq,
          // 운동 번호 프롭스로?
          isEtSeq: prpos.level,
          isRegDt: moment(Date.now()).format('YYYY-MM-DD'),
          isTime: time,
          isWeek: 0,
        });
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
    // 서버로 현재 타임을 보내준다.
    setTime(currentTime);
  };
  useEffect(() => {
    if (time !== '00:00:00') fetchData();
  }, [time]);

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
          className='px-6 py-2  ml-5 bg-[#FF8339] text-white rounded  hover:bg-gray-300'
        >
          Start
        </button>
      ) : (
        <button
          onClick={stop}
          className='px-6 py-2  ml-5 bg-gray-300 text-white hover:text-white rounded hover:bg-[#FF8339]'
        >
          Stop
        </button>
      )}
      <button
        onClick={restart}
        className='px-6 py-2  ml-5 bg-gray-300 text-white rounded hover:bg-[#FF8339]'
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

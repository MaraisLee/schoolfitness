import React, { useEffect, useState } from 'react';
import run1 from 'assets/run1.png';
import arrowWhite from 'assets/arrowWhite.png';
import { MdTimer } from 'react-icons/md';
import StopWatch from './StopWatch';
import { Link, useParams } from 'react-router-dom';
import axios from 'api/axios';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';

const WeightGuide = () => {
  const { id } = useParams();
  const [getId, setGetId] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const [etExplain, setEtExplain] = useState('');
  const [levelName, setLevelName] = useState('');
  // Recoil 사용자 정보
  const userInfo = useRecoilValue(userAtom);
  const getDetailData = async () => {
    // 상세 정보 내용 출력
    // const getNum = id ? Number(id) + 1 : 1;
    const getNum = Number(id);
    setGetId(getNum);
    if (getNum === 17) {
      setLevelName('걷기');
    } else if (getNum === 18) {
      setLevelName('줄넘기');
    } else if (getNum === 19) {
      setLevelName('달리기');
    } else if (getNum === 20) {
      setLevelName('계단오르기');
    }

    const getUrl = `level/exercise/${userInfo.miSeq}/${getNum}`;
    const res = await axios.get(getUrl);
    // 상세 설명
    setEtExplain(res.data.etExplain);
    // 이미지 가져오기
    const resImg = await axios.get(`download/img/detail/${res.data.url}`);

    setImgUrl(resImg.request.responseURL);
  };

  useEffect(() => {
    getDetailData();
  }, []);
  return (
    <div>
      <div className='flex justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <Link to={'/weight'}>
          <img src={arrowWhite} alt='' className='scale-25' />
        </Link>
        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold'>다이어터 운동기록 </p>
        <p> </p>
        <p> </p>
        <Link to={'/individual'}>
          <MdTimer className='text-white' />
        </Link>
      </div>
      <div className='  m-5   text-center'>
        {' '}
        <div className='text-[#ff8339] font-bold text-sm'>⏱ {levelName} ⏱</div>
        <div className='bg-white  drop-shadow rounded-md p-3 '>
          <img src={imgUrl} alt='' className='text-center mb-2 m-auto ' />
          <span className='text-xs'>{etExplain}</span>
          <br />
        </div>
      </div>
      <StopWatch part='weightguide' level={getId} />
    </div>
  );
};

export default WeightGuide;

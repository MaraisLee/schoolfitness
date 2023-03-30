import React, { useEffect, useState } from 'react';
import run1 from 'assets/run1.png';
import arrowWhite from 'assets/arrowWhite.png';
import { MdTimer } from 'react-icons/md';
import StopWatch from './StopWatch';
import { Link, useParams } from 'react-router-dom';
import axios from 'api/axios';

const DietGuide = () => {
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState('');
  const [etExplain, setEtExplain] = useState('');
  const [levelName, setLevelName] = useState('');
  const getDetailData = async () => {
    // 상세 정보 내용 출력
    // const getNum = id ? Number(id) + 1 : 1;
    const getNum = Number(id);
    if (getNum === 21) {
      setLevelName('푸쉬업');
    } else if (getNum === 22) {
      setLevelName('스쿼트');
    } else if (getNum === 23) {
      setLevelName('윗몸일으키기');
    } else if (getNum === 24) {
      setLevelName('플랭크');
    }
    // console.log(getNum);
    const getUrl = `level/exercise/1/${getNum}`;
    // console.log(getUrl);
    const res = await axios.get(getUrl);
    // console.log(res.data.url);
    // 이미지 가져오기
    const resImg = await axios.get(`download/img/detail/${res.data.url}`);
    // console.log('이미지', resImg.request.responseURL);
    setImgUrl(resImg.request.responseURL);
  };

  useEffect(() => {
    getDetailData();
  }, []);
  return (
    <div>
      <div className='flex justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <Link to={'/diet'}>
          <img src={arrowWhite} alt='' className='scale-25' />
        </Link>
        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold'>웨이터 운동기록 </p>
        <p> </p>
        <p> </p>
        <Link to={'/individual'}>
          <MdTimer className='text-white' />
        </Link>
      </div>
      <div className='  m-5   text-center'>
        {' '}
        <div>{levelName}</div>
        <div className='bg-white  drop-shadow rounded-md p-3 '>
          <img src={imgUrl} alt='' className='text-center mb-2 m-auto ' />
          <span className='text-xs'>{etExplain}</span>
          <br />
        </div>
      </div>
      <StopWatch part='weightguide' level={99} />
    </div>
  );
};

export default DietGuide;

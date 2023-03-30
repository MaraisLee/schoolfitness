import React, { useEffect, useState } from 'react';
import arrowWhite from 'assets/arrowWhite.png';
import axios from 'api/axios';
import run from 'assets/run.png';
import { MdTimer } from 'react-icons/md';
import { Link } from 'react-router-dom';
export type ScoreType = {
  etSeq: number;
  etName: string;
  etDetail: string;
  url: string;
};
const Diet = () => {
  const initData = [
    {
      etSeq: 1,
      etName: '달리기',
      etDetail: '10분',
      url: '',
    },
    {
      etSeq: 2,
      etName: '달리기',
      etDetail: '10분',
      url: '',
    },
    {
      etSeq: 3,
      etName: '달리기',
      etDetail: '10분',
      url: '',
    },
    {
      etSeq: 4,
      etName: '달리기',
      etDetail: '10분',
      url: '',
    },
  ];

  const [myLevelOne, setMyLevelOne] = useState([]);
  const [myLevelTwo, setMyLevelTwo] = useState([]);
  const [myLevelThird, setMyLevelThird] = useState([]);

  const [levelData, setLevelData] = useState([]);
  const [myImgArr, setmyImgArr] = useState<string[]>([]);
  const getLevelData = async () => {
    // console.log('getLevelData ============== ');
    await axios
      .get('level/exercise/2?levelSeq=1')
      .then(res => {
        // console.log(res.data);
        setMyLevelOne(res.data);
      })
      .catch(err => console.log(err));

    await axios
      .get('level/exercise/2?levelSeq=2')
      .then(res => {
        // console.log(res.data);
        setMyLevelTwo(res.data);
      })
      .catch(err => console.log(err));

    const res = await axios.get('level/exercise/2?levelSeq=3');
    setMyLevelThird(res.data);

    // 걷기 이미지
    // console.log('걷기  : ', res.data[0].url);
    const resWalk = await axios.get(
      `download/img/thumbnail/${res.data[0].url}`,
    );

    // 줄넘기 이미지
    // console.log('줄넘기 500 : ', res.data[1].url);
    const resJump = await axios.get(
      `download/img/thumbnail/${res.data[1].url}`,
    );
    // 달리기 이미지
    // console.log('달리기  : ', res.data[2].url);
    const resRun = await axios.get(`download/img/thumbnail/${res.data[2].url}`);

    // 계단오르기 이미지
    // console.log('계단오르기 500 : ', res.data[3].url);
    const resUp = await axios.get(`download/img/thumbnail/${res.data[3].url}`);

    const imgTempArr: string[] = [];
    // console.log(resWalk.request);
    imgTempArr.push(resWalk.request.responseURL);
    imgTempArr.push(resRun.request.responseURL);
    imgTempArr.push(resJump.request.responseURL);
    imgTempArr.push(resUp.request.responseURL);
    setmyImgArr([...imgTempArr]);
    console.log(myImgArr);
  };

  useEffect(() => {
    getLevelData();
  }, []);
  // console.log('MyLevel', myLevel);
  return (
    <div className=''>
      <div className='flex justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <img src={arrowWhite} alt='' className='scale-25' />
        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold'> 다이어트 운동가이드 </p>
        <p> </p>
        <p> </p>
        <Link to={'/individual'}>
          <MdTimer className='text-white' />
        </Link>
      </div>
      <div className=' h-[635px] m-5 w-[65opx] scrall overflow-y-auto scrollbar-hide'>
        <div className=' h-[485px] pt-3 pl-3 bg-slate-100 mb-4'>
          <p className='w-16 h-7 mb-3 border-[#ff8339] rounded-lg text-center leading-7  text-[#ff8339] border-solid border-2'>
            level 1
          </p>

          <ul className='grid  gap-x-0 gap-y-4 grid-cols-2 ml-2 text-center '>
            {' '}
            {myLevelOne.map((item: ScoreType, index) => (
              <li
                key={index}
                className='bg-white w-[150px] drop-shadow rounded-md  '
              >
                <Link to={`/dietguide/${index}`}>
                  {' '}
                  <img
                    src={myImgArr[index]}
                    alt='안녕'
                    className='text-center w-[130px] h-[150px] mb-2 m-auto scale-[60%]'
                  />
                  <span className='text-sm '>{item.etName}</span>
                  <br />
                  <span className='text-xs '>{item.etDetail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className=' h-[485px] pt-3 pl-3 bg-slate-100'>
          <p className='w-16 h-7 mb-3 border-[#ff8339] rounded-lg text-center leading-7  text-[#ff8339] border-solid border-2'>
            level 2
          </p>

          <ul className='grid  gap-x-0 gap-y-4 grid-cols-2 ml-2 text-center '>
            {' '}
            {myLevelTwo.map((item: ScoreType, index) => (
              <li
                key={index}
                className='bg-white w-[150px] drop-shadow rounded-md  '
              >
                <Link to={`/dietguide/${index}`}>
                  {' '}
                  <img
                    src={myImgArr[index]}
                    alt=''
                    className='text-center w-[130px] h-[150px] mb-2 m-auto scale-[60%]'
                  />
                  <span className='text-sm '>{item.etName}</span>
                  <br />
                  <span className='text-xs '>{item.etDetail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className=' h-[485px] pt-3 pl-3 bg-slate-100'>
          <p className='w-16 h-7 mb-3 border-[#ff8339] rounded-lg text-center leading-7  text-[#ff8339] border-solid border-2'>
            level 3
          </p>

          <ul className='grid  gap-x-0 gap-y-4 grid-cols-2 ml-2 text-center '>
            {' '}
            {myLevelThird.map((item: ScoreType, index) => (
              <li
                key={index}
                className='bg-white w-[150px] drop-shadow rounded-md  '
              >
                <Link to={`/dietguide/${index}`}>
                  {' '}
                  <img
                    src={myImgArr[index]}
                    alt=''
                    className='text-center w-[130px] h-[150px] mb-2 m-auto scale-[60%]'
                  />
                  <span className='text-sm '>{item.etName}</span>
                  <br />
                  <span className='text-xs '>{item.etDetail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Diet;

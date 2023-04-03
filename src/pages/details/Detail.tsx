import React, { useState, useEffect } from 'react';
import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';
import BackHandleClick from 'components/util/BackHandleClick';
import instance from 'api/axios';

// 삭제아이콘
import { TiDeleteOutline } from 'react-icons/ti';
import { match } from 'assert';
import Individual from 'pages/guide/Individual';
import { Link } from 'react-router-dom';
import { MdTimer } from 'react-icons/md';

interface IScore {
  isSeq: number;
  isMiSeq: number;
  isRegDt: string;
  isTime: string;
  etName: string;
  levelType: string;
  giStatus: string;
  esType: string;
  url: string;
}
const Detail = () => {
  // 개인기록 조회
  const [score, setScore] = useState([]);
  // 개인기록 추가
  const [scoreAdd, setScoreAdd] = useState(false);
  // 개인기록 삭제
  const [scoreDelete, setScoreDelte] = useState(false);

  const etNameArr = [
    {
      title: '사이클',
      imgtitle: 'cycle',
      getter: 'walkingImg',
      setter: 'setCycling',
    },
    { title: '댄스', imgtitle: 'dance', getter: 'dance', setter: 'setDance' },
    {
      title: '하이킹',
      imgtitle: 'hiking',
      getter: 'hiking',
      setter: 'setHiking',
    },
    {
      title: '필라테스',
      imgtitle: 'pilates',
      getter: 'pilates',
      setter: 'setPilates',
    },
    { title: '수영', imgtitle: 'pool', getter: 'swim', setter: 'setSwim' },
    {
      title: '걷기',
      imgtitle: 'walkingImg',
      getter: 'walkingImg',
      setter: 'setWalkingImg',
    },
    { title: '요가', imgtitle: 'yoga', getter: 'yoga', setter: 'setYogaImg' },
    {
      title: '코어트레이닝',
      imgtitle: 'cycle',
      getter: 'core',
      setter: 'setCore',
    },
  ];
  const [filters, setFilers] = useState(etNameArr[0].imgtitle);
  console.log();

  // 개인기록 조회
  const fetchData = async () => {
    await instance.get('individualscore/list?memberNo=1').then((res: any) => {
      setScore(res.data.list);
      console.log('개인기록목록조회', res.data.list);
    });
  };

  // 개인기록삭제
  const scoreDelte = async (seq: number) => {
    await instance.delete(`individualscore/${seq}`).then((res: any) => {
      setScoreDelte(!scoreDelete);
    });
  };

  // 개인기록추가
  const scoreAddHandler = async () => {
    setScoreAdd(true);
    await instance.put('/individualscore').then((res: any) => {
      return alert(res.data.status);
    });
  };
  // 이미지 다운 url
  const [myexercise, setMyExercise] = useState([]);
  // 걷기 이미지
  const [walkingImg, setWalkingImg] = useState('');
  // 요가 이미지
  const [yoga, setYogaImg] = useState('');
  // 하이킹
  const [hiking, setHiking] = useState('');
  // 사이클링
  const [cycle, setCycling] = useState('');
  // 댄스
  const [dance, setDance] = useState('');
  // 필라테스
  const [pilates, setPilates] = useState('');
  // 수영
  const [swim, setSwim] = useState('');
  // 코어트레이닝
  const [core, setCore] = useState('');

  // 리팩토링
  // [walkingImg,yoga,hiking, cycle, dance , pilates, swim, core]
  // [setWalkingImg,setYogaImg, setHiking, setHiking, setCycling,setDance,setPilates, setSwim,setCore ]
  const getindiData = async () => {
    await instance
      .get('exercise')
      .then(async res => {
        setMyExercise(res.data);
        console.log(res.data);
        await instance
          // 걷기이미지
          .get('/download/img/thumbnail/' + res.data[0].url)
          .then(res => {
            setWalkingImg(res.request.responseURL);
            console.log(res.request.responseURL);
          })
          .catch(err => console.log(err));
        await instance
          // 사이클링
          .get('/download/img/thumbnail/' + res.data[1].url)
          .then(res => {
            setCycling(res.request.responseURL);
            console.log(res.request.responseURL);
          })
          .catch(err => console.log(err));
        // 요가
        await instance
          .get('/download/img/thumbnail/' + res.data[2].url)
          .then(res => {
            setYogaImg(res.request.responseURL);
            console.log(res.request.responseURL);
          })
          .catch(err => console.log(err));
        // 댄스
        await instance
          .get('/download/img/thumbnail/' + res.data[3].url)
          .then(res => {
            setDance(res.request.responseURL);
            console.log(res.request.responseURL);
          })
          .catch(err => console.log(err));
        // 코어
        await instance
          .get('/download/img/thumbnail/' + res.data[4].url)
          .then(res => {
            setCore(res.request.responseURL);
            console.log(res.request.responseURL);
          })
          .catch(err => console.log(err));
        // 필테
        await instance
          .get('/download/img/thumbnail/' + res.data[5].url)
          .then(res => {
            setPilates(res.request.responseURL);
            console.log(res.request.responseURL);
          })
          .catch(err => console.log(err));
        // 수영
        await instance
          .get('/download/img/thumbnail/' + res.data[6].url)
          .then(res => {
            setSwim(res.request.responseURL);
            console.log(res.request.responseURL, '수영');
          })
          .catch(err => console.log(err));
        // 하이킹
        await instance
          .get('/download/img/thumbnail/' + res.data[7].url)
          .then(res => {
            setHiking(res.request.responseURL);
            console.log(res.request.responseURL);
          })
          .catch(err => console.log(err));
      })

      .catch(err => console.log(err));
  };
  console.log(myexercise);
  const urlList = myexercise.map((urlList: any, i: any) => urlList.url);
  console.log(urlList[0]);

  useEffect(() => {
    getindiData();
  }, []);

  // 삭제
  useEffect(() => {
    fetchData();
  }, [scoreDelete]);

  // useEffect(() => {}, []);

  return (
    <>
      <HeaderCss className='my-3'>
        <BackHandleClick />
        <h1>Health Report</h1>
        <Link to={'/individual'}>
          <MdTimer className=' text-[#ff8339] ' />
        </Link>
      </HeaderCss>
      <InnerCss className='px-5'>
        {/* 나중에 링크 걸면됨 */}
        <div className='flex justify-start gap-[230px]'> </div>
        <div className='overflow-y-auto scrollbar-hide h-[660px]'>
          <div>
            {' '}
            <p className='text-center'>이번주기록</p>
            <LineChart />
            <div>
              <div>
                <p className='text-center'>개인성적 통계</p>
                <BarChart />
              </div>
              <div>
                <p className='text-center'>개인기록</p>
              </div>
              {/* <div className='flex my-3 relative'>
                <input type='text' placeholder='종목명'></input>
                <input type='text' placeholder='시간'></input>
                <button onClick={(e)=>{
                  return e.stopPropagation();
                }} className='absolute top-0 right-0 border-2 w-7 h-6 bg-blue-400 px-2'>추가하기</button>
              </div> */}

              <div className=''>
                {score
                  ? score?.map((scoreList: any, i: any) => (
                      <div
                        key={i}
                        className=' flex relative justify-between items-center bg-slate-200 rounded-xl py-3 px-4 mt-5'
                      >
                        <p>
                          {scoreList.isRegDt
                            ? scoreList.isRegDt.replace(/-/g, '.').substr(5, 10)
                            : '2023-04-03'}
                        </p>

                        <img
                          className='w-11 h-11'
                          src={
                            scoreList.etName === '걷기'
                              ? walkingImg
                              : scoreList.etName === '걷기LV1'
                              ? walkingImg
                              : scoreList.etName === '오래달리기'
                              ? walkingImg
                              : scoreList.etName === '걷기LV1'
                              ? walkingImg
                              : scoreList.etName === '오래달리기'
                              ? walkingImg
                              : scoreList.etName === '사이클링'
                              ? cycle
                              : scoreList.etName === '요가'
                              ? yoga
                              : scoreList.etName === '댄스'
                              ? dance
                              : scoreList.etName === '필라테스'
                              ? pilates
                              : scoreList.etName === '하이킹'
                              ? hiking
                              : scoreList.etName === '댄스'
                              ? dance
                              : scoreList.etName === '코어트레이닝'
                              ? core
                              : scoreList.etName === '수영'
                              ? swim
                              : walkingImg
                          }
                          alt='운동그림'
                        />

                        <div className='flex justify-between w-[180px]'>
                          <span className=''>
                            {scoreList.etName ? scoreList.etName : '댄스'}
                          </span>

                          <p className=''>
                            {scoreList.isTime ? scoreList.isTime : '11:01:00'}
                          </p>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              scoreDelte(scoreList.isSeq);
                            }}
                            className='absolute right-2 top-1 text-gray-600'
                          >
                            <TiDeleteOutline />
                          </button>
                        </div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </InnerCss>
    </>
  );
};
export default Detail;

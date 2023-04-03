import React, { useState, useEffect } from 'react';
import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';
import BackHandleClick from 'components/util/BackHandleClick';

import instance from 'api/axios';
// 삭제아이콘
import { TiDeleteOutline } from 'react-icons/ti';

interface IScore {
  isSeq: number;
  isMiSeq: number;
  isRegDt: string;
  isTime: string;
  etName: string;
  levelType: string;
  giStatus: string;
  esType: string;
}
const Detail = () => {
  // 개인기록 조회
  const [score, setScore] = useState([]);
  // 개인기록 삭제
  const [scoreDelete, setScoreDelte] = useState<IScore[]>([]);
  // 개인기록 조회
  const fetchData = async () => {
    await instance
      .get('individualscore/list?memberNo=1')
      .then(res => setScore(res.data.list));
  };
  // 개인기록삭제
  const scoreDelte = async (seq: number) => {
    await instance.delete(`individualscore/${seq}`).then(res => {
      return alert(res.data.status);
    });
  };
  // console.log(scoreDelete, '삭제');
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <InnerCss className='px-5'>
        <HeaderCss>
          {/* 나중에 링크 걸면됨 */}
          <BackHandleClick />
          <h1>디테일 페이지</h1>
        </HeaderCss>
        <div className='overflow-y-auto scrollbar-hide h-[660px] '>
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
              <div>
                {score.map((scoreList: any, i: any) => (
                  <div
                    key={i}
                    className='flex relative justify-between bg-slate-200 rounded-xl py-6 px-4 my-3'
                  >
                    <img src='' alt='운동그림' />
                    <span className='absolute left-[120px]'>
                      {scoreList.etName}{' '}
                    </span>
                    <div className=''>
                      <p>{scoreList.isTime}</p>
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </InnerCss>
    </>
  );
};
export default Detail;

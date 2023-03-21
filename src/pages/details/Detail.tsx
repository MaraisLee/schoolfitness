import React, { useState, useEffect } from 'react';
import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';
import BackHandleClick from 'components/util/BackHandleClick';
import instance from 'api/axios';
// 삭제아이콘
import { TiDeleteOutline } from 'react-icons/ti';

const Detail = () => {
  const [score, setScore] = useState([]);
  // 개인기록 조회
  const fetchData = async () => {
    await instance.get('/api/individualscore/list').then(res => {
      setScore(res.data);
    });
  };
  useEffect(() => {
    fetchData();
    console.log('ffff');
  }, []);

  return (
    <>
      <InnerCss>
        <HeaderCss>
          {/* 나중에 링크 걸면됨 */}
          <BackHandleClick />
          <h1>디테일 페이지</h1>
        </HeaderCss>
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
              <div className='flex relative justify-between bg-slate-200 rounded-xl py-6 px-4 my-3'>
                <img src='' alt='운동그림' />
                <span className='absolute left-[120px]'>스쿼트 </span>
                <div className=''>
                  <p>1분 30초</p>
                  <button className='absolute right-2 top-1 text-gray-600'>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InnerCss>
    </>
  );
};
export default Detail;

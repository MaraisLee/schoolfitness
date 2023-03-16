import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';

const Detail = () => {
  // 데이터 정의

  return (
    <>
    <InnerCss>
      <HeaderCss>
        {/* 나중에 링크 걸면됨 */}
        <img src='images/arrow.png' alt='' />
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
          <div >
            <p>개인기록</p>
          
          
          </div>
          <div>
            <div className='flex justify-between bg-slate-200 rounded-sm py-5 px-4 my-3'>
              <img src='' alt='운동그림'></img>
              <span className='absolute left-[120px]'>스쿼트 </span> 
              <div className=''>
              <p>1분 30초</p>{' '}
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

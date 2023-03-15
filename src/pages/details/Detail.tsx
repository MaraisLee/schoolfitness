import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import { HeaderCss } from 'styles/LayoutCss';

const Detail = () => {
  // 데이터 정의

  return (
    <>
      <HeaderCss>
        {/* 나중에 링크 걸면됨 */}
        <img src='images/arrow.png' alt='' />
        <h1>디테일 페이지</h1>
      </HeaderCss>
      <div>
        {' '}
        <p>이번주기록</p>
        <LineChart />
        <div>
          <div>
            <p>개인성적 통계</p>
            <BarChart />
          </div>
          <div className='flex bg-red-300'>
            <p>개인기록</p>
            <select>
              <option> 종목</option>
              <option>스쿼트</option>
              <option>러닝</option>
              <option>턱걸이</option>
              <option>달리기</option>
              <option>푸쉬업</option>
            </select>
            <select>
              <option>시간 (분)</option>
              <option>1분</option>
              <option>2분</option>
              <option>3분</option>
              <option>4분</option>
              <option>5분</option>
            </select>
            <select>
              <option> 시간(초)</option>
              <option>10초</option>
              <option>20초</option>
              <option>30초</option>
              <option>40초</option>
              <option>50초</option>
            </select>
          </div>
          <div>
            <div>
              <img src='' alt='운동그림'></img>
              <span>스쿼트 </span>
            </div>
            <div>
              <p>1분 30초</p>{' '}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;

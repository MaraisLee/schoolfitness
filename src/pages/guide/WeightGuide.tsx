import run1 from 'assets/run1.png';
import arrowWhite from 'assets/arrowWhite.png';
import { MdTimer } from 'react-icons/md';
import StopWatch from './StopWatch';
import { Link } from 'react-router-dom';
const WeightGuide = () => {
  return (
    <div>
      <div className='flex justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <Link to={'/weight'}>
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
        <div className='bg-white  drop-shadow rounded-md p-3 '>
          <img src={run1} alt='' className='text-center mb-2 m-auto ' />
          <span className='text-xs   '>
            턱을 가슴 쪽으로 잡아당기며 호흡하기 편한 자세로 전방 10~20m 앞을
            주시하는 것이 좋다. 몸체(척추)는 전체적으로 곧게 펴는 것이 좋고,
            앞으로 살짝 5도 정도 기울여도 괜찮다. 등이나 어깨를 구부리거나
            상체에 너무 힘을 줘서 근육이 긴장하지 않도록 주의해야 한다
          </span>
          <br />
        </div>
      </div>
      <StopWatch part='weightguide' />
    </div>
  );
};

export default WeightGuide;

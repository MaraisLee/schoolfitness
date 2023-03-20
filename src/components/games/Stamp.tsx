import { useNavigate } from 'react-router-dom';

const Stamp = () => {
  const navigate = useNavigate();
  const stampHandler = () => {
    navigate('/stampgif')
  };
  return (
    <div className='flex flex-col justify-center items-center text-center'>
      <h1>스탬프 찍기</h1>
      <div>Stamp</div>
      <div>Stamp</div>
      <div>Stamp</div>
      <div>Stamp</div>
      <div>Stamp</div>
      <div>Stamp</div>
      <div>Stamp</div>
      <div>Stamp</div>
      {/* 추후, 스탬프 디자인 따라서 글자 색상 변경 */}
      <p className='text-[#4A4A4A] text-[15px]'>
        게임 순위 발표 후 기회가 주어집니다. <br />
        앞으로
        <span className='text-[22px] text-[#ff8339] font-extrabold'>10</span>번
        더 할 수 있어요!
      </p>
      <button
        className='w-[300px] h-[50px] font-extrabold text-white text-[20px] bg-[#ff8339] rounded-lg mt-3'
        onClick={stampHandler}
      >
        STAMP
      </button>
      <span className='text-[#C9C9C9] text-xs underline pt-6'>
        공지사항 보러가기
      </span>
    </div>
  );
};

export default Stamp;

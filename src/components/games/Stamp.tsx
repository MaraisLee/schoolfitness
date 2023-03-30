import { useNavigate } from 'react-router-dom';
import beforeStamp from 'assets/beforeStamp.png';
import black3 from 'assets/black3000won.png';
import black5 from 'assets/black5000won.png';
import black10 from 'assets/black10000won.png';
import black20 from 'assets/black20000won.png';
import redo from 'assets/redo.png';
import axios from 'api/axios';
import { useEffect, useState } from 'react';

const Stamp = () => {
  const navigate = useNavigate();
  const stampHandler = () => {
    navigate('/stampgif');
  };
  const goNotice = () => {
    navigate('/notice');
  };
  const [myStamp, setMyStamp] = useState(0);
  const [myStampLeft, setMyStampLeft] = useState(0);
  const getStampData = () => {
    axios
      .get('game/stamp/1')
      .then(res => {
        setMyStamp(res.data.use);
        setMyStampLeft(res.data.available);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getStampData();
  }, []);

  const giftCard = (index: number) => {
    if (index === 4) {
      return black3;
    } else if (index === 9) {
      return black5;
    } else if (index === 14) {
      return black10;
    } else if (index === 19) {
      return black20;
    } else {
      return beforeStamp;
    }
  };

  const redoHandler = () => {
    getStampData();
  };

  return (
    <div className='flex flex-col justify-center items-center text-center'>
      <div className='w-[85%] flex justify-between items-end '>
        <span className='text-[18px]'>
          <b>옌</b>님의 스탬프 현황
        </span>
        <div className='text-[#FF8339] text-[15px] flex  justify-center items-end leading-none'>
          <b className='text-[26px]'>{myStamp}</b>/20개
          <img
            src={redo}
            alt='redo'
            width={18}
            className='ml-2 cursor-pointer'
            onClick={redoHandler}
          />
        </div>
      </div>
      {/* 스탬프 20개 5단위마다 상품권 */}
      <div className='w-full h-[320px] bg-[#D2D2D3] my-5 flex justify-center items-center'>
        <div className='w-full flex justify-center items-center flex-wrap gap-x-3'>
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index}>
              <img
                src={giftCard(index)}
                alt='stamp'
                width={
                  index === 4 || index === 9 || index === 14 || index === 19
                    ? 75
                    : 57
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* 추후, 스탬프 디자인 따라서 글자 색상 변경 */}
      <p className='text-[#4A4A4A] text-[15px]'>
        🎉스탬프 찍기
        <br />
        게임 순위 발표 후 기회가 주어집니다. <br />
        앞으로
        <span className='text-[22px] text-[#ff8339] font-extrabold'>
          &nbsp;{myStampLeft}
        </span>
        번 더 할 수 있어요!
      </p>
      <button
        className='w-[300px] h-[50px] font-extrabold text-white text-[20px] bg-[#ff8339] rounded-lg mt-3'
        onClick={stampHandler}
      >
        STAMP
      </button>
      <span
        className='text-[#C9C9C9] text-xs underline pt-6 cursor-pointer'
        onClick={goNotice}
      >
        공지사항 보러가기
      </span>
    </div>
  );
};

export default Stamp;

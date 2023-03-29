import { Link, useNavigate } from 'react-router-dom';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';
import arrow from 'assets/arrow.png';
import Grade from 'components/games/Grade';
import Stamp from '../../components/games/Stamp';
import { useState } from 'react';
import { GameBt } from 'styles/Button';
import BackHandleClick from 'components/util/BackHandleClick';

const Game = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const selected =
    'border-b-2 pb-4 border-b-[#FF8339] cursor-pointer text-[#403D3D] ';
  const gameStartHandler = () => {
    navigate('/gamesubmit');
  };

  return (
    <InnerCss>
      <HeaderCss>
        <BackHandleClick />
        <h1>Game Zone</h1>
        <GameBt onClick={gameStartHandler}>START</GameBt>
      </HeaderCss>
      <div className='h-[635px] my-5'>
        <div className='flex justify-around mb-6 pt-1 text-[16px] font-bold border-b border-b-slate-200 text-[#7C7C7C] cursor-pointer'>
          <span
            className={isOpen ? selected : ''}
            onClick={() => setIsOpen(true)}
          >
            전체 순위
          </span>
          <span
            className={isOpen ? '' : selected}
            onClick={() => setIsOpen(false)}
          >
            마이 스탬프
          </span>
        </div>
        {isOpen ? <Grade /> : <Stamp />}
      </div>
    </InnerCss>
  );
};

export default Game;

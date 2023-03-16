import { Link } from 'react-router-dom';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';
import arrow from 'assets/arrow.png';
import Grade from 'components/games/Grade';
import Stamp from './Stamp';

const Game = () => {
  return (
    <InnerCss>
      <HeaderCss>
        {/* 나중에 링크 걸면됨 */}
        <img src={arrow} alt='' />
        <h1>게임 라운지</h1>
      </HeaderCss>
      <Grade />
      <Stamp />
    </InnerCss>
  );
};

export default Game;

// import { Link } from 'react-router-dom';
import { HeaderCss } from 'styles/LayoutCss';

const Game = () => {
  return (
    <>
      <HeaderCss>
        {/* 나중에 링크 걸면됨 */}
        <img src='images/arrow.png' alt='' />
        <h1>이전페이지</h1>
      </HeaderCss>
      <div>게임 페이지 입니다.</div>
    </>
  );
};

export default Game;

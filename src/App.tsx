import { BrowserRouter, Route, Routes } from 'react-router-dom';
// layout
import './App.css';
import { Wrapper } from 'styles/LayoutCss';
import Nav from 'components/Nav';
import statusBar from 'assets/statusBar.png';
// user
import Login from 'pages/login/Login';
import SignUp from 'pages/login/SignUp';
import UserInfo from 'pages/UserInfo';
// workout
import StopWatch from 'pages/guide/StopWatch';
import WeightGuide from 'pages/guide/WeightGuide';
import DietGuide from 'pages/guide/DietGuide';
import Individual from 'pages/guide/Individual';
import Weight from 'pages/guide/Weight';
import Diet from 'pages/guide/Diet';
// game
import Game from 'pages/game/Game';
import GameSubmit from 'components/games/GameSubmit';
import Notice from 'pages/game/Notice';
// detail
import Detail from 'pages/details/Detail';
import DetailInfo from 'pages/login/DetailInfo';

import Home from 'pages/home/Home';
import Main from 'pages/main/Main';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <img src={statusBar} />
        <Routes>
          {/* 홈 */}
          <Route path='/home' element={<Home />} />
          {/* 게임 */}
          <Route path='/' element={<Main />} />
          <Route path='/game' element={<Game />} />
          <Route path='/gamesubmit' element={<GameSubmit />} />
          <Route path='/notice' element={<Notice />} />
          {/* 헬스 리포트 */}
          <Route path='/detail' element={<Detail />} />
          {/* 회원 관련 */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detailinfo' element={<DetailInfo />} />
          <Route path='/userinfo' element={<UserInfo />} />
          {/* 운동영상 관련 */}
          <Route path='/weight' element={<Weight />} />
          <Route path='/diet' element={<Diet />} />
          <Route path='/individual' element={<Individual />} />
          <Route path='/weightguide/:id' element={<WeightGuide />} />
          <Route path='/dietguide/:id' element={<DietGuide />} />
          {/* <Route path='/stopwatch' element={<StopWatch />} /> */}
        </Routes>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}
export default App;

import Nav from 'components/Nav';
import Detail from 'pages/details/Detail';

import StopWatch from 'pages/guide/StopWatch';
import WeightGuide from 'pages/guide/WeightGuide';
import DietGuide from 'pages/guide/DietGuide';
import Individual from 'pages/guide/Individual';

import Weight from 'pages/guide/Weight';
import Diet from 'pages/guide/Diet';
import Game from 'pages/game/Game';
import Login from 'pages/login/Login';
import SignUp from 'pages/login/SignUp';
import UserInfo from 'pages/UserInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wrapper } from 'styles/LayoutCss';
import './App.css';
import statusBar from 'assets/statusBar.png';
import DetailInfo from 'pages/login/DetailInfo';
import StampGIF from 'components/games/StampGIF';
import Home from 'pages/home/Home';
import Main from 'pages/main/Main';
import GameSubmit from 'components/games/GameSubmit';
import Notice from 'pages/game/Notice';

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
          <Route path='/detail' element={<Detail />} />
          <Route path='/stampgif' element={<StampGIF />} />
          <Route path='/notice' element={<Notice />} />
          {/* 회원 관련 */}
          <Route path='/detailinfo' element={<DetailInfo />} />
          <Route path='/userinfo' element={<UserInfo />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {/* 운동영상 관련 */}
          <Route path='/weight' element={<Weight />} />
          <Route path='/diet' element={<Diet />} />
          {/* <Route path='/stopwatch' element={<StopWatch />} /> */}
          <Route path='/weightguide/:id' element={<WeightGuide />} />
          <Route path='/dietguide/:id' element={<DietGuide />} />
          <Route path='/individual' element={<Individual />} />
         
        </Routes>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}
export default App;

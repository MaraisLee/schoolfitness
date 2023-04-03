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

import Main from 'pages/main/Main';
import { userAtom } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import EditProfile from 'pages/login/EditProfile';
import PrivateRoute from 'components/user/PrivateRoute';

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <BrowserRouter>
      <Wrapper>
        <img src={statusBar} />
        <Routes>
          {user.miSeq ? (
            <Route path='/' element={<Main />} />
          ) : (
            <Route path='/' element={<Login />} />
          )}
          <Route path='/signup' element={<SignUp />} />
          {/* 게임 */}
          <Route element={<PrivateRoute />}>
            <Route path='/game' element={<Game />} />
            <Route path='/gamesubmit' element={<GameSubmit />} />
            <Route path='/notice' element={<Notice />} />
            {/* 헬스 리포트 */}
            <Route path='/detail' element={<Detail />} />
            {/* 회원 관련 */}
            <Route path='/detailinfo' element={<DetailInfo />} />
            <Route path='/userinfo' element={<UserInfo />} />
            <Route path='/editprofile' element={<EditProfile />} />
            {/* 운동영상 관련 */}
            <Route path='/weight' element={<Weight />} />
            <Route path='/diet' element={<Diet />} />
            <Route path='/individual' element={<Individual />} />
            <Route path='/weightguide/:id' element={<WeightGuide />} />
            <Route path='/dietguide/:id' element={<DietGuide />} />
          </Route>
          {/* <Route path='/stopwatch' element={<StopWatch />} /> */}
        </Routes>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}
export default App;

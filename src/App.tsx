import Nav from 'components/Nav';
import Detail from 'pages/details/Detail';

import Weight from 'pages/guide/Weight';

import Game from 'pages/game/Game';
import Login from 'pages/login/Login';
import SignUp from 'pages/login/SignUp';
import UserInfo from 'pages/UserInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wrapper } from 'styles/LayoutCss';
import './App.css';

import StopWatch from 'pages/guide/StopWatch';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <img src='images/statusbar.png' />
        <Routes>
          <Route path='/game' element={<Game />} />
          <Route path='/detail' element={<Detail />} />
          <Route path='/userinfo' element={<UserInfo />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/detail' element={<Detail />} />
          <Route path='/weight' element={<Weight />} />
          <Route path='/stopwatch' element={<StopWatch />} />
        </Routes>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

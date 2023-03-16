import Nav from 'components/Nav';
import DetailInfo from 'pages/DetailInfo';
import Detail from 'pages/details/Detail';

import Game from 'pages/game/Game';
import Login from 'pages/login/Login';
import SignUp from 'pages/login/SignUp';
import UserInfo from 'pages/UserInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wrapper } from 'styles/LayoutCss';
import './App.css';

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
          <Route path='/detailinfo' element={<DetailInfo />} />
        </Routes>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

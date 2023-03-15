import Nav from 'components/Nav';
import Detail from 'pages/details/Detail';

import Game from 'pages/game/Game';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InnerCss, Wrapper } from 'styles/LayoutCss';
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
        </Routes>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

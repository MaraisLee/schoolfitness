import Nav from 'components/Nav';
import Detail from 'pages/details/Detail';

import Game from 'pages/game/Game';
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
            <Route path='/' element={<Game />} />
            <Route path='/detail' element={<Detail />} />
            <Route path='/userinfo' element={<UserInfo />} />
            
          </Routes>
        
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

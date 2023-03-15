import Nav from 'components/Nav';
import Detail from 'pages/details/Detail';

import Weight from 'pages/gide/Weight';
import Game from 'pages/game/Game';
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
          <Route path='/Weight' element={<Weight />} />
        </Routes>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

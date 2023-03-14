import Nav from 'components/Nav';

import Game from 'pages/game/Game';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InnerCss, Wrapper } from 'styles/LayoutCss';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <img src='images/statusbar.png' />
        <InnerCss>
          <Routes>
            <Route path='/' element={<Game />} />
          </Routes>
        </InnerCss>
        <Nav />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

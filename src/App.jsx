import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
//import Bubbles from './components/Bubbles';
import Home from './pages/Home';
import Game from './pages/Game';
import SummaryPage from './pages/Summary';

function App() {
  return (
    <Router basename="/Tech-quiz">
      <GameProvider>
        <div className="min-h-screen relative overflow-hidden" dir="rtl">
          {/* Animated Background */}
          <div className="animated-bg"></div>
          
          {/* Interactive Bubbles */}
          {/*<Bubbles />*/}
          
          {/* Content */}
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/summary" element={<SummaryPage />} />
            </Routes>
          </div>
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;


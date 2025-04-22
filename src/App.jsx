import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BattleProvider } from './context/BattleContext';
import BattlePage from './pages/BattlePage';

function App() {
  return (
    <BattleProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Routes>
            <Route path="/" element={<BattlePage />} />
          </Routes>
        </div>
      </Router>
    </BattleProvider>
  );
}

export default App;
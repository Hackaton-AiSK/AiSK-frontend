import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import StorePage from './pages/Store';
const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<StorePage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

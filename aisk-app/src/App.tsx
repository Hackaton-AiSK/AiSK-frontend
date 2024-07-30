import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import StorePage from './pages/Store';
import TransitionWrapper from './wrapper/TransitionWrapper';
const App: React.FC = () => {
  return (
    <Router>
      <TransitionWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<StorePage/>} />
        </Routes>
      </TransitionWrapper>
    </Router>
  );
};

export default App;

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change from Switch to Routes
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Note the change from Switch to Routes */}
          <Route path="/signup" element={<Signup />} /> {/* Note the change from component to element */}
          <Route path="/login" element={<Login />} /> {/* Note the change from component to element */}
          <Route path="/home" element={<Home />} /> {/* Note the change from component to element */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

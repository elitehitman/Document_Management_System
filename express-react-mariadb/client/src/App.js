// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change from Switch to Routes
import Signup from './components/Signup';
import Login from './components/Login';
import Success from './components/Success';

function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Note the change from Switch to Routes */}
          <Route path="/signup" element={<Signup />} /> {/* Note the change from component to element */}
          <Route path="/login" element={<Login />} /> {/* Note the change from component to element */}
          <Route path="/success" element={<Success />} /> {/* Note the change from component to element */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change from Switch to Routes
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Document from './components/Document';
import Staff from './components/Staff'
import "./App.css"
import StaffProfile from './components/StaffProfile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/documents" element={<Document />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

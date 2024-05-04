import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Document from './components/Document';
import Staff from './components/Staff';
import StaffProfile from './components/StaffProfile';
import DocumentPage from './components/DocumentPage';
import Admin from './components/Admin';
import AddStudent from './components/AddStudent';
import LandingPage from './components/Landing';
import './App.css';

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsUserLogin={setIsUserLogin} />} />
          <Route path="/home" element={<Home isUserLogin={isUserLogin} />} />
          <Route path="/profile" element={<Profile isUserLogin={isUserLogin} />} />
          <Route path="/documents" element={<Document isUserLogin={isUserLogin} />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
          <Route path="/documents/:regNo" element={<DocumentPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

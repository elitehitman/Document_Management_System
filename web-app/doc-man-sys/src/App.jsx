import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/SignIn";
import Signup from "./components/SignUp";
import GoogleCallback from "./components/GoogleCallback";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

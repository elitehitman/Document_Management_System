import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { GoogleLogin } from "react-google-login"; // Import GoogleLogin from react-google-login
import "./Signin.css"; // Import the CSS file

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Add logic to handle Google Sign-In response
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>Forgot Password?</p>
        <GoogleLogin
          clientId="312460858971-sotsv17nerjl394tqhuec1s6thshqle7.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <Link to="/signup">New user? Sign up here</Link>{" "}
        {/* Link to the signup page */}
      </div>
    </div>
  );
};

export default Signin;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSignup();
        }
    };

    const handleSignup = async () => {
        try {
            if (password !== confirmPassword) {
                setPasswordError('Passwords do not match');
                return;
            }

            const response = await axios.post('http://localhost:5000/signup', { username, password });
            console.log(response.data);

            if (response.data.message === 'Password updated successfully!') {
                window.location.href = '/login';
            } else {
                console.error('Error:', response.data.message);
                setSignupError(response.data.message); // Set signup error message
            }
        } catch (error) {
            console.error('Error:', error);
            setSignupError('User does not exist'); // Set signup error message for internal server errors
        }
    };

    return (
        <div className={`bg-gradient-to-r from-pink-500 to-purple-500 min-h-screen flex justify-center items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <h1 className="text-3xl text-center mb-8 text-gray-800">Sign up</h1>
                <input
                    type="text"
                    className="block border border-gray-300 rounded w-full py-3 px-4 mb-4 leading-tight focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="block border border-gray-300 rounded w-full py-3 px-4 mb-4 leading-tight focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="block border border-gray-300 rounded w-full py-3 px-4 mb-6 leading-tight focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError('');
                        setSignupError('');
                    }}
                    onKeyDown={handleKeyPress}
                />
                {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
                {signupError && <p className="text-red-500 mb-4">{signupError}</p>}

                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleSignup}
                >
                    Create Account
                </button>

                <div className="text-center text-gray-700 mb-4">
                    By signing up, you agree to the
                    <a className="ml-1 no-underline border-b border-gray-700 text-gray-700" href="#">
                        Terms of Service
                    </a> and
                    <a className="ml-1 no-underline border-b border-gray-700 text-gray-700" href="#">
                        Privacy Policy
                    </a>
                </div>

                <div className="text-gray-700 text-center">
                    Already have an account?
                    <Link className="ml-1 no-underline border-b border-blue-500 text-blue-500" to="/login">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
    );
};

export default Signup;

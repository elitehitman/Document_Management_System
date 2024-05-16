import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './tailwind-cloud-animation.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, []);

    // Forcefully remove login values from local storage when component mounts
    localStorage.removeItem('isUserLogin');
    localStorage.removeItem('isStaffLogin');
    localStorage.removeItem('isAdminLogin');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log(response.data);

            if (response.data.message === 'Login successful!') {
                localStorage.setItem('userType', response.data.userType);
                if (response.data.userType === 'user') {
                    localStorage.setItem('username', username);
                    localStorage.setItem('isUserLogin', true);
                    console.log('User logged in');
                    navigate('/home');
                } else if (response.data.userType === 'staff') {
                    localStorage.setItem('username', username);
                    localStorage.setItem('isStaffLogin', true);
                    console.log('Staff logged in');
                    navigate('/staff');
                } else if (response.data.userType === 'admin') {
                    localStorage.setItem('username', username);
                    localStorage.setItem('isAdminLogin', true);
                    console.log('Admin logged in');
                    navigate('/admin');
                }
            } else {
                setLoginError(response.data.message); // Set login error message
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError('Invalid username or password.');
        }
    };

    return (
        <div className="cloud-container">
            <div className="clouds"></div>
            <div className={`bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen flex justify-center items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <form className="bg-white rounded-lg shadow-lg p-8 w-96" onSubmit={handleLogin}>
                    <h1 className="text-3xl text-center mb-6 text-gray-800">Login</h1>
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
                        className="block border border-gray-300 rounded w-full py-3 px-4 mb-6 leading-tight focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {loginError && (
                        <p className="text-red-500 mb-4 transition duration-300 ease-in-out transform hover:scale-105">{loginError}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Login
                    </button>
                    <div className="text-center text-gray-700 mt-4">
                        New user?
                        <Link className="ml-2 text-purple-500 hover:text-purple-700 transition duration-300 ease-in-out transform hover:scale-105" to="/signup">
                            Sign up here
                        </Link>.
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

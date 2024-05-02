// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log(response.data);

            if (response.data.message === 'Login successful!') {
                if (response.data.userType === 'user') {
                    // Redirect regular users to the home page
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    window.location.href = '/home';
                } else if (response.data.userType === 'staff') {
                    // Redirect staff members to the staff page
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    window.location.href = '/staff';
                }
            } else {
                console.error('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-full text-center py-3 rounded border border-black bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1" // Update button styles
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        New user?
                        <Link className="no-underline border-b border-blue text-blue" to="/signup">
                            Sign up here
                        </Link>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

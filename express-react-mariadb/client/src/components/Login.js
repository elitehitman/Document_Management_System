import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log(response.data);
            // If login is successful, redirect to the success page
            if (response.data.message === 'Login successful!') {
                // Redirect to the success page
                window.location.href = '/success';
            } else {
                // Handle other cases like invalid credentials
                console.error('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

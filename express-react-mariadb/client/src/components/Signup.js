import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/signup', { username, password });
            console.log(response.data);
            // If signup is successful, redirect to the login page
            if (response.data.message === 'Password updated successfully!') {
                // Redirect to the login page
                window.location.href = '/login';
            } else {
                // Handle other cases like invalid credentials
                console.error('Error:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;

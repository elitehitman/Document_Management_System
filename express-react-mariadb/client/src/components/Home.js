// src/components/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data when the component mounts
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            console.log("Fetching user data...");
            const username = localStorage.getItem('username');
            console.log("Username from local storage:", username);
            const response = await axios.get('http://localhost:5000/userdata', {
                params: {
                    username: username
                }
            });
            console.log("Response:", response.data);
            setUserData(response.data.userData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log("User Data:", userData);

    return (
        <div>
            <h2>Success</h2>
            {userData && (
                <div>
                    <p>You have successfully logged in!</p>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Registration Number:</strong> {userData.reg_no}</p>
                    <p><strong>Aadhar Number:</strong> {userData.aadhar_no}</p>
                    <p><strong>Email:</strong> {userData.email_id}</p>
                    <p><strong>Mobile Number:</strong> {userData.mobile_no}</p>
                    {/* Display other user data attributes as needed */}
                </div>
            )}
        </div>
    );
};

export default Home;

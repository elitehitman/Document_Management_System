import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StaffSidebar from './StaffSidebar';
const StaffProfile = () => {
    const [staffData, setStaffData] = useState(null);

    useEffect(() => {
        // Fetch staff data from the server when the component mounts
        const fetchStaffData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/staffdata', {
                    params: {
                        username: localStorage.getItem('username') // Pass the logged-in username as a parameter
                    }
                });
                setStaffData(response.data.staffData);
            } catch (error) {
                console.error('Error fetching staff data:', error);
            }
        };

        fetchStaffData();
    }, []);

    return (
        <div className="flex h-screen">
            <StaffSidebar />
            {/* Main content */}
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">Staff Details:</h2>
                {staffData ? (
                    <div>
                        <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4 mb-4">
                            <p className="detail"><strong>Name:</strong> {staffData.emp_name}</p>
                        </div>
                        <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4 mb-4">
                            <p className="detail"><strong>Email:</strong> {staffData.emp_email}</p>
                        </div>
                        <div className="detail-box border border-gray-400 rounded-lg bg-gray-200 p-4 mb-4">
                            <p className="detail"><strong>Department:</strong> {staffData.dept}</p>
                        </div>
                        {/* Display other staff details as needed */}
                    </div>
                ) : (
                    <p>Loading staff data...</p>
                )}
            </div>
        </div>
    );
};

export default StaffProfile;

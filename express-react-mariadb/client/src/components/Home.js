import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from './Sidebar';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [documentImage, setDocumentImage] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const isUserLogin = localStorage.getItem('isUserLogin') === 'true';
        const isStaffLogin = localStorage.getItem('isStaffLogin') === 'true';
        const isAdminLogin = localStorage.getItem('isAdminLogin') === 'true';

        if (!isUserLogin) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.get('http://localhost:5000/userdata', {
                params: {
                    username: username
                }
            });

            console.log("Response from /userdata endpoint:", response.data); // Log the response data

            setUserData(response.data.userData);

            // Fetch document image for doc_id = d11 if it exists
            try {
                const docResponse = await axios.get('http://localhost:5000/document/' + response.data.userData.reg_no + '/d11', { responseType: 'blob' });
                setDocumentImage(URL.createObjectURL(docResponse.data));
            } catch (docError) {
                console.error("Error fetching document image:", docError);
                // If document image fetch fails, do nothing or handle as required
            }
        } catch (error) {
            console.error(error);
            // Handle error or navigate to login page
            navigate('/login'); // Navigate to login page
        }
    };



    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8 relative">
                <div className="absolute top-1/2 transform -translate-y-1/2 right-16 w-1/4 p-4 border border-gray-400 rounded bg-gray-300 shadow-lg">
                    {documentImage && <img src={documentImage} alt="Document" className="w-full h-auto rounded-lg" style={{ backgroundColor: '#E5E7EB' }} />}
                </div>
                <div className="w-2/3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">

                    </div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Details</h2>
                    {userData && (
                        <div>
                            <div className="detail-box border border-gray-400 rounded-lg bg-white p-6 mb-6 shadow-md hover:shadow-lg ">
                                <p className="detail text-gray-800 text-lg"><strong>Name:</strong> {userData.name}</p>
                            </div>
                            <div className="detail-box border border-gray-400 rounded-lg bg-white p-6 mb-6 shadow-md hover:shadow-lg ">
                                <p className="detail text-gray-800 text-lg"><strong>Registration Number:</strong> {userData.reg_no}</p>
                            </div>
                            <div className="detail-box border border-gray-400 rounded-lg bg-white p-6 mb-6 shadow-md hover:shadow-lg ">
                                <p className="detail text-gray-800 text-lg"><strong>Course:</strong> {userData.course}</p>
                            </div>
                            <div className="detail-box border border-gray-400 rounded-lg bg-white p-6 mb-6 shadow-md hover:shadow-lg ">
                                <p className="detail text-gray-800 text-lg"><strong>Branch:</strong> {userData.branch}</p>
                            </div>
                            <div className="detail-box border border-gray-400 rounded-lg bg-white p-6 mb-6 shadow-md hover:shadow-lg ">
                                <p className="detail text-gray-800 text-lg"><strong>Study Year:</strong> {userData.study_year}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [showDocument, setShowDocument] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documentImage, setDocumentImage] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

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
                    username: username // Pass username to the backend
                }
            });
            console.log("Response:", response.data);
            setUserData(response.data.userData);
        } catch (error) {
            console.error('Error:', error);
            // Redirect to login page if not authenticated
            navigate('/login'); // Use navigate to redirect
        }
    };


    const fetchDocuments = async () => {
        try {
            console.log("Fetching documents...");
            const response = await axios.get('http://localhost:5000/alldocuments');
            console.log("Documents:", response.data);
            setDocuments(response.data.documents);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const handleViewAllDocuments = () => {
        // Fetch documents when "Document" button is clicked
        fetchDocuments();
    };

    const handleViewDocument = async (doc_id, doc_name) => {
        try {
            setSelectedDocument(doc_name);
            setShowDocument(true);
            const response = await axios.get(`http://localhost:5000/document/${userData.reg_no}/${doc_id}`, { responseType: 'blob' });
            console.log("Document Data:", response.data);
            setDocumentImage(URL.createObjectURL(response.data));
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    const handleCloseDocument = () => {
        setShowDocument(false);
        setDocumentImage(null);
    };
    const handleLogout = () => {
        // Clear local storage and navigate to login page
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        navigate('/login');
    };
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
            {/* Display logout button */}
            <button onClick={handleLogout}>Logout</button>

            {/* Display "Document" button */}
            <div>
                <button onClick={handleViewAllDocuments}>Document</button>
            </div>

            {/* Display buttons for each unique document when "Document" button is clicked */}
            {documents.length > 0 && (
                <div>
                    <h3>Documents</h3>
                    {[...new Map(documents.map(doc => [doc.doc_id, doc])).values()].map((document, index) => (
                        <button key={index} onClick={() => handleViewDocument(document.doc_id, document.doc_name)}>
                            {document.doc_name}
                        </button>
                    ))}
                </div>
            )}

            {/* Display document view */}
            {showDocument && (
                <div>
                    <h3>View Document</h3>
                    <p>Document Name: {selectedDocument}</p>
                    {/* Display document image */}
                    {documentImage && <img src={documentImage} alt="Document" />}
                    <button onClick={handleCloseDocument}>Close Document</button>
                </div>
            )}
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DocumentPage = () => {
    const { regNo: initialRegNo } = useParams(); // Extract regNo from URL params
    const [regNo, setRegNo] = useState(initialRegNo); // State to hold regNo
    const [userData, setUserData] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [documentImage, setDocumentImage] = useState(null);

    useEffect(() => {
        fetchUserData();
        fetchDocuments();
    }, [regNo]); // Fetch data whenever regNo changes

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/studentdata/${regNo}`);
            console.log("Fetched user data:", response.data.userData); // Log fetched user data
            setUserData(response.data.userData);

            // Fetch document image for doc_id = d11
            const docResponse = await axios.get(`http://localhost:5000/document/${regNo}/d11`, { responseType: 'blob' });
            setDocumentImage(URL.createObjectURL(docResponse.data));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleViewDocument = (doc_id) => {
        if (userData) {
            window.open(`http://localhost:5000/document/${userData.reg_no}/${doc_id}`, '_blank');
        } else {
            console.error('User data not available');
        }
    };

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/alldocuments');
            // Filter out duplicate document types
            const uniqueDocuments = response.data.documents.reduce((acc, document) => {
                if (!acc.some(doc => doc.doc_name === document.doc_name)) {
                    acc.push(document);
                }
                return acc;
            }, []);
            // Ensure that we have exactly 15 unique document types
            const updatedDocuments = uniqueDocuments.concat(Array.from({ length: 15 - uniqueDocuments.length }).map((_, index) => ({ doc_id: `d${index + 1}`, doc_name: `Document ${index + 1}` })));
            setDocuments(updatedDocuments);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-200 p-4">
                {/* Display the document image */}
                {documentImage && (
                    <div className="flex justify-center mb-4"> {/* Center the image horizontally */}
                        <img
                            src={documentImage}
                            alt="Document"
                            style={{ width: '50%', height: 'auto',border:'2px solid black' }} // Apply styling to reduce size by 50%
                        />
                    </div>
                )}

                {/* Display student details */}
                {userData && (
                    <div>
                        <h2 className="text-xl font-bold">Student Details:</h2>
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Registration Number:</strong> {userData.reg_no}</p>
                        <p><strong>Aadhar Number:</strong> {userData.aadhar_no}</p>
                        <p><strong>Email:</strong> {userData.email_id}</p>
                        <p><strong>Mobile Number:</strong> {userData.mobile_no}</p>
                        <p><strong>Course:</strong> {userData.course}</p>
                        <p><strong>Branch:</strong> {userData.branch}</p>
                        <p><strong>Study Year:</strong> {userData.study_year}</p>
                        <p><strong>Gender:</strong> {userData.gender}</p>
                        <p><strong>Category:</strong> {userData.category}</p>
                        <p><strong>Caste:</strong> {userData.caste}</p>
                        <p><strong>Birth Date:</strong> {userData.birth_date}</p>
                        <p><strong>Age:</strong> {userData.age}</p>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 flex flex-wrap justify-center">
                {documents.map((document, index) => (
                    <div
                        key={index}
                        className="w-1/6 h-50 rounded overflow-hidden shadow-lg m-4 document-card cursor-pointer flex justify-center items-center transition-transform transform hover:scale-105"
                        onClick={() => handleViewDocument(document.doc_id)}
                    >
                        <div className="font-bold text-xl">{document.doc_name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentPage;

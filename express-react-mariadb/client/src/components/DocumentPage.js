import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DocumentPage = () => {
    const { regNo: initialRegNo } = useParams(); // Extract regNo from URL params
    const [regNo, setRegNo] = useState(initialRegNo); // State to hold regNo
    const [userData, setUserData] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [documentImage, setDocumentImage] = useState(null);
    const [selectedDocId, setSelectedDocId] = useState(null); // Track selected doc_id
    const [selectedFile, setSelectedFile] = useState(null); // Track selected file
    const navigate = useNavigate();

    useEffect(() => {
        // Set height of html and body to 100% and hide overflow to prevent scrolling
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.documentElement.style.overflow = 'hidden';

        // Check if staff is logged in
        const isStaffLogin = localStorage.getItem('isStaffLogin') === 'true';
        const isAdminLogin = localStorage.getItem('isAdminLogin') === 'true';
        if (!isStaffLogin && !isAdminLogin) {
            // Redirect to login page if staff is not logged in
            navigate('/login');
        } else {
            // Fetch user data and documents if staff is logged in
            fetchUserData();
            fetchDocuments();
        }
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/studentdata/${regNo}`);
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

    // Function to handle file selection
    const handleFileSelect = (event, doc_id) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedDocId(doc_id);
    };

    // Function to handle file upload
    const handleFileUpload = async () => {
        try {
            console.log('Selected file:', selectedFile); // Add this line to log the selected file
            console.log('Selected document ID:', selectedDocId); // Add this line to log the selected document ID

            // Find the document object corresponding to the selectedDocId
            const selectedDocument = documents.find(doc => doc.doc_id === selectedDocId);

            // Ensure that the selected document exists
            if (selectedDocument) {
                console.log('Selected document:', selectedDocument); // Log the selected document

                const formData = new FormData();
                formData.append('document', selectedFile);
                formData.append('regNo', userData.reg_no);
                formData.append('docId', selectedDocId);
                formData.append('docName', selectedDocument.doc_name); // Append the docName to the form data

                const response = await axios.post('http://localhost:5000/upload-document', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
            } else {
                console.error('Selected document not found');
            }
        } catch (error) {
            console.error('Error uploading document:', error);
        }
    };



    return (
        <div className="flex h-screen">
            {/* Sidebar with Student Details */}
            <div className="w-1/4 bg-gray-200 p-4 flex flex-col justify-center items-center">
                {/* Conditionally render the document image if it exists */}
                {documentImage && (
                    <img
                        src={documentImage}
                        alt="Document"
                        style={{ width: '50%', height: 'auto', border: '2px solid black', marginBottom: '1rem' }}
                    />
                )}
                {/* Always display student details */}
                {userData && (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">Student Details:</h2>
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
                        <p><strong>Birth Date:</strong>{new Date(userData.birth_date).toLocaleDateString()}</p>
                        <p><strong>Age:</strong> {userData.age}</p>
                    </div>
                )}
            </div>

            {/* Document Images Section */}
            <div className="flex-1 p-8 flex flex-wrap justify-center">
                {documents.map((document, index) => (
                    <div key={index} className="m-4 w-1/6">
                        <div
                            className="h-24 rounded overflow-hidden shadow-lg document-card cursor-pointer flex justify-center items-center transition-transform transform hover:scale-105 hover:rotate-3 hover:shadow-3xl bg-blue-700 text-white border-2 border-black"

                            onClick={() => handleViewDocument(document.doc_id)}
                        >
                            <div className="font-bold text-xl">{document.doc_name}</div>
                        </div>
                        {localStorage.getItem('isAdminLogin') === 'true' && (
                            <div className="flex flex-col items-center mt-2">
                                <input
                                    type="file"
                                    onChange={(event) => handleFileSelect(event, document.doc_id)}
                                />
                                <button
                                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 text-sm block"
                                    onClick={handleFileUpload}
                                >
                                    Update Document
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

};

export default DocumentPage;

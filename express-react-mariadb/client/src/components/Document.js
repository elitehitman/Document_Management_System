import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Document = () => {
    const [documents, setDocuments] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
        fetchDocuments();
    }, []);

    const fetchUserData = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.get('http://localhost:5000/userdata', {
                params: {
                    username: username
                }
            });
            setUserData(response.data.userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
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

    const handleViewDocument = (doc_id) => {
        if (userData) {
            window.open(`http://localhost:5000/document/${userData.reg_no}/${doc_id}`, '_blank');
        } else {
            console.error('User data not available');
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
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

export default Document;

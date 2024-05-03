import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StaffSidebar from './StaffSidebar';

const Staff = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/studentnames');
                setStudents(response.data.students);
                setFilteredStudents(response.data.students); // Initialize filtered students with all students
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleSearch = () => {
        const filtered = students.filter(student => {
            return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.reg_no.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredStudents(filtered);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex h-screen">
            <StaffSidebar />
            <div className="flex flex-col flex-grow ml-48">
                <div className="bg-gray-800 p-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 text-gray-200 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress} // Call handleSearch when Enter key is pressed
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="flex-1 p-8 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">List of Students:</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, index) => (
                                <div key={index} className="border border-gray-300 rounded-md p-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-semibold">{student.name}</p>
                                        <p>Study Year: {student.study_year}</p>
                                        <p>Course: {student.course}</p>
                                        <p>Branch: {student.branch}</p>
                                        <p>Registration Number: {student.reg_no}</p>
                                    </div>
                                    {/* Add View Documents button */}
                                    <Link to={`/documents/${student.reg_no}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                        View Documents
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No students found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staff;

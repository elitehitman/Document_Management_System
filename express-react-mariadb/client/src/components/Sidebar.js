import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('username');
        localStorage.removeItem('password'); // Assuming you store password for some reason
        localStorage.removeItem('isUserLogin');
        localStorage.removeItem('isStaffLogin');
        localStorage.removeItem('isAdminLogin');
        navigate('/login');
    };

    return (
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white w-48 p-4 flex flex-col justify-between">
            <div>
                <h1 className="text-xl font-bold mb-4">Menu</h1>
                <ul>
                    <li className="py-2">
                        <button onClick={() => handleNavigate('/home')} className="hover:text-yellow-300 transition duration-300 block rounded-md px-4 py-2 bg-blue-700 w-full text-center hover:scale-105">Home</button>
                    </li>
                    <li className="py-2">
                        <button onClick={() => handleNavigate('/profile')} className="hover:text-yellow-300 transition duration-300 block rounded-md px-4 py-2 bg-blue-700 w-full text-center hover:scale-105">Profile</button>
                    </li>
                    <li className="py-2">
                        <button onClick={() => handleNavigate('/documents')} className="hover:text-yellow-300 transition duration-300 block rounded-md px-4 py-2 bg-blue-700 w-full text-center hover:scale-105">Documents</button>
                    </li>
                </ul>
            </div>
            <button onClick={handleLogout} className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition duration-300 w-full hover:scale-105">Logout</button>
        </div>
    );
};

export default Sidebar;

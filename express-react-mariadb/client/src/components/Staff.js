import React from 'react';
import StaffSidebar from './StaffSidebar';
const Staff = () => {


    return (
        <div className="flex h-screen">
            <div className="flex h-screen">
                <StaffSidebar />
            </div>
            {/* Search bar */}
            <div className="flex flex-col flex-grow">
                <div className="bg-gray-800 p-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 text-gray-200 bg-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                {/* Main content */}
                <div className="flex-1 p-8">
                    {/* Your main content here */}
                </div>
            </div>
        </div>
    );
};

export default Staff;

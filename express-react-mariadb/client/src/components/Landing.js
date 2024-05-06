import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from Framer Motion library

// Import the image as a variable
import backgroundImage from '../VJTI_Background.jpg';

const Landing = () => {
    useEffect(() => {
        // Forcefully remove login values from local storage when component mounts
        localStorage.removeItem('isUserLogin');
        localStorage.removeItem('isStaffLogin');
        localStorage.removeItem('isAdminLogin');

        // Set height of html and body to 100% and hide overflow to prevent scrolling
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.documentElement.style.overflow = 'hidden';
    }, []);

    return (
        <motion.div
            className="bg-cover bg-center h-screen relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                mixBlendMode: 'darken', // Set blend mode to darken
            }}
            initial={{ opacity: 0 }} // Initial opacity
            animate={{ opacity: 1 }} // Animate opacity to 1
            transition={{ duration: 1 }} // Transition duration
        >
            {/* Website name */}
            <div className="absolute top-0 left-0 p-4 text-white font-bold text-lg">MyDocs</div>

            {/* Navigation */}
            <div className="flex justify-end p-4 bg-gray-800">
                <Link
                    to="/login"
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out" // Transition on hover
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="mx-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out" // Transition on hover
                >
                    Sign Up
                </Link>
            </div>

            {/* Content */}
            <motion.div
                className="flex flex-col items-center justify-center h-full text-center"
                initial={{ y: -100, opacity: 0 }} // Initial position and opacity
                animate={{ y: 0, opacity: 1 }} // Animate to final position and opacity
                transition={{ type: 'spring', stiffness: 120, duration: 1 }} // Spring animation
                style={{
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow
                }}
            >
                <h1 className="text-4xl font-bold text-white mb-4">Revolutionize Your Document Management Experience Like Never Before!</h1>
            </motion.div>
        </motion.div>
    );
};

export default Landing;

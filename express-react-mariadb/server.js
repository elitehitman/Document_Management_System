// server.js

const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the database connection
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();

        // Check if user exists
        const existingUser = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        if (existingUser.length === 0) {
            conn.release();
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Update password if it's currently NULL
        if (existingUser[0].password === null) {
            await conn.query('UPDATE user SET password = ? WHERE username = ?', [password, username]);
            conn.release();
            return res.json({ message: 'Password updated successfully!' });
        } else {
            conn.release();
            return res.status(400).json({ message: 'User already has a password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        conn.release();
        if (result.length === 0 || result[0].password !== password) {
            res.status(401).json({ message: 'Invalid username or password' });
        } else {
            // Fetch user data from the student table based on the username (email_id)
            const userData = await conn.query('SELECT * FROM student WHERE email_id = ?', [username]);
            res.json({ message: 'Login successful!', userData: userData[0] }); // Send user data along with the response
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new route to fetch user data
app.get('/userdata', async (req, res) => {
    try {
        const { username } = req.query;
        console.log("Received username:", username); // Log received username
        const conn = await pool.getConnection();
        const userData = await conn.query('SELECT * FROM student WHERE email_id = ?', [username]);
        console.log("Fetched userData:", userData); // Log fetched userData
        conn.release();
        res.json({ userData: userData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

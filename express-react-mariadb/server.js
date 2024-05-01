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
            // Fetching reg_no from the user table result
            const regNo = result[0].reg_no;
            // Fetch user data from the student table based on the reg_no (student table)
            const userData = await conn.query('SELECT * FROM student WHERE reg_no = ?', [regNo]);
            res.json({ message: 'Login successful!', userData: userData[0] }); // Send user data along with the response
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new route to fetch user data
// Add a new route to fetch user data
app.get('/userdata', async (req, res) => {
    try {
        const { username } = req.query;
        console.log("Received username:", username); // Log received username
        const conn = await pool.getConnection();

        // Fetch user data from both user and student tables
        const userData = await conn.query(`
            SELECT u.username, s.*
            FROM user u
            INNER JOIN student s ON u.user_id = s.reg_no
            WHERE u.username = ?
        `, [username]);

        console.log("Fetched userData:", userData); // Log fetched userData
        conn.release();

        // Send the user data to the client
        res.json({ userData: userData[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/alldocuments', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const documents = await conn.query('SELECT doc_id, doc_name FROM document');
        conn.release();
        res.json({ documents });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new route to fetch document image
app.get('/document/:regNo/:docId', async (req, res) => {
    try {
        const { regNo, docId } = req.params;
        const conn = await pool.getConnection();
        const documentData = await conn.query('SELECT doc_img FROM document WHERE stud_reg_no = ? AND doc_id = ?', [regNo, docId]);
        conn.release();
        if (documentData.length === 0 || !documentData[0].doc_img) {
            res.status(404).json({ message: 'Document not found' });
        } else {
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': documentData[0].doc_img.length
            });
            res.end(documentData[0].doc_img);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

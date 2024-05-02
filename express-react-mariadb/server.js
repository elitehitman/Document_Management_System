// server.js

const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the database connection
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Signup route
// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();

        // Check if user exists
        const existingUser = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            // Update password if it's currently NULL
            if (existingUser[0].password === null) {
                await conn.query('UPDATE user SET password = ? WHERE username = ?', [password, username]);
                conn.release();
                return res.json({ message: 'Password updated successfully!' });
            } else {
                conn.release();
                return res.status(400).json({ message: 'User already has a password' });
            }
        }

        // Check if staff member exists
        const existingStaff = await conn.query('SELECT * FROM staff WHERE emp_email = ?', [username]);
        if (existingStaff.length > 0) {
            // Update password if it's currently NULL
            if (existingStaff[0].passwords === null) {
                await conn.query('UPDATE staff SET passwords = ? WHERE emp_email = ?', [password, username]);
                conn.release();
                return res.json({ message: 'Password updated successfully!' });
            } else {
                conn.release();
                return res.status(400).json({ message: 'Staff member already has a password' });
            }
        }

        conn.release();
        return res.status(400).json({ message: 'User does not exist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Login route
// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();

        // Check if the user is a regular user
        let result = await conn.query('SELECT * FROM user WHERE username = ?', [username]);
        if (result.length > 0 && result[0].password === password) {
            // Fetching reg_no from the user table result
            const regNo = result[0].reg_no;
            // Fetch user data from the student table based on the reg_no (student table)
            const userData = await conn.query('SELECT * FROM student WHERE reg_no = ?', [regNo]);
            conn.release();
            return res.json({ message: 'Login successful!', userType: 'user', userData: userData[0] });
        }

        // Check if the user is a staff member
        result = await conn.query('SELECT * FROM staff WHERE emp_email = ?', [username]);
        if (result.length > 0 && result[0].passwords === password) {
            conn.release();
            return res.json({ message: 'Login successful!', userType: 'staff' });
        }

        conn.release();
        res.status(401).json({ message: 'Invalid username or password' });
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
// server.js

// Add a new route to fetch staff data
app.get('/staffdata', async (req, res) => {
    try {
        const { username } = req.query;
        const conn = await pool.getConnection();

        // Fetch staff data based on the username
        const staffData = await conn.query('SELECT * FROM staff WHERE emp_email = ?', [username]);

        conn.release();

        // Send the staff data to the client
        res.json({ staffData: staffData[0] });
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

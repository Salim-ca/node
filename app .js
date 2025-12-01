const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Pool } = require('pg'); // Use Pool for better server connection management

const app = express();
const PORT = 3000;

// --- 1. PostgreSQL Connection Pool Configuration ---
// Using a Pool is crucial for high-traffic web servers.
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodedb',
    password: '1234', 
    port: 5432,
});

// Check connection on startup
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database: nodedb'))
    .catch(err => console.error('Database connection error:', err));


// --- 2. Middleware and Static Files Setup ---
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Logging middleware
app.use(morgan('dev'));

// CORS and Body Parsing Middleware (for handling JSON data from POST requests)
app.use(cors());
app.use(express.json()); 


// --- 3. Express Routes ---

// Home Page Route
app.get('/', (req, res) => {
    const blogs = [
        { title: 'what is the answer to life', snippet: 'i dont know the answer to life yet'},
        { title: 'how to be happy', snippet: 'happiness is a choice'},
        { title: 'what is love', snippet: 'baby dont hurt me no more'},
    ];
    res.render('index', {title: 'Home page', blogs});
});

// About Page Route
app.get('/about', (req,res) => {
    res.render('about', {title: 'about page'});
});

// Create Blog Page Route
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'create a new blog'});
});

// Redirection Route
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});


// --- 4. POST Data Handler (Integration with tuts1 - User Data) ---
app.post('/postData', async (req, res) => {
    // VITAL DEBUGGING STEP: Log the raw body received from the client
    console.log('Received Body for /postData (tuts1):', req.body);
    
    // Data Extraction: NOW expecting 'bio' to match your database column.
    const { name, id, bio } = req.body; 

    // Basic Validation Check: Now checking for 'bio'.
    if (!name || !id || !bio) {
        return res.status(400).json({ 
            message: 'Missing required fields: name, id, and bio.' 
        });
    }

    // SQL Query: Targeting the 'tuts1' table and 'bio' column.
    const insert_query = 
        'INSERT INTO tuts1 (id, name, bio) VALUES($1, $2, $3) RETURNING *';
    const queryValues = [id, name, bio];

    try {
        // Use pool.query() with async/await for a modern, robust connection
        const result = await pool.query(insert_query, queryValues);

        // Success Response (HTTP 201 Created)
        res.status(201).json({ 
            message: 'User data successfully posted to tuts1.',
            newUser: result.rows[0] // The newly inserted row
        });

    } catch (error) {
        console.error('PostgreSQL insertion error:', error);
        
        // Handle specific error code for unique constraint violation (e.g., duplicate ID)
        if (error.code === '23505') { 
             return res.status(409).json({ message: 'The ID you provided already exists.' });
        }
        
        // Generic Server Error
        res.status(500).json({ 
            message: 'Failed to save data due to a server error.', 
            error: error.message 
        });
    }
});


// --- 5. 404 Page (Must be the last route handler) ---
app.use((req, res) =>{
    res.status(404).render('404', {title: '404 page'});
});

// --- 6. Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

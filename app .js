
const express = require('express');
const path = require('path');
const app = express();

const PORT = 3002;

// serve static files (optional)
app.use(express.static(path.join(__dirname, 'mpn')));

// home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'mpn', 'index.html'));
});

// about route
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'mpn', 'about.html'));
});

// redirect route
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// start server
app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});



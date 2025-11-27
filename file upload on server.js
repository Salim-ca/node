const express = require('express');

const app = express();


app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p> welcome to the homme page </p>');
    res.sendFile('./index.html', {root:__dirname});
})
app.get('/about', (req, res) => {
    // res.send('<p> welcome to the about page </p>');
    res.sendFile('./abouts.html', {root: __dirname});
})
app.get('/blog', (req, res) => {
    // res.send('<p> welcome to the blog page </p>');
    res.sendFile('./blog.html', {root:__dirname});
})
app.get('/404', (req, res) => {
    // res.send('<p> welcome to the 040 page </p>');
    res.sendFile('./404.html', {root:__dirname});
})
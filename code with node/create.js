const express = require('express')

const app = express();


app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root:__dirname });
})
app.get('/abouts', (req,res) => {
    res.sendFile('./abouts.html', {root:__dirname});
})
app.get('/blog', (req, res) => {
    res.sendFile('./blog.html', {root:__dirname});
})

//redirecting

app.get('/about-me', (req, res) => {
    res.redirect('/abouts');
})

//404 page

app.use((req, res) =>{
    res.sendFile('/404.html', {root:__dirname});

})

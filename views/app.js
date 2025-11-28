const express = require('express')

const app = express();
app.set('view engine', 'ejs');
//if there is a folder named other you tell express to use it

// app.set('views', 'name_of_folder');

app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
       { title: 'what is the answer to life', snippet: 'i dont know the answer to life yet'},
     { title: 'how to be happy', snippet: 'happiness is a choice'},
       { title: 'what is love', snippet: 'baby dont hurt me no more'},
    ];
    // res.sendFile('./index.html', {root:__dirname });

    //lots use ejs to render dynamic content
    res.render('index', {title: 'Home page', blogs});
})
app.get('/about', (req,res) => {
    // res.sendFile('./abouts.html', {root:__dirname});

    //lets render about.ejs file
    res.render('about', {title: 'about page'});
})
// app.get('/blog', (req, res) => {
//     res.sendFile('./blog.html', {root:__dirname});
// })
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'create a new blog'});
})

//redirecting

app.get('/about-me', (req, res) => {
    res.redirect('/about');
})

//404 page

app.use((req, res) =>{
res.status(404).render('404', {title: '404 page'});

})
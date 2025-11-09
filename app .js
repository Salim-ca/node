const express = require('express');

//epress app
 const app = express();

 //listen for request
 app.listen(3001)
 console.log('listening for request on port 3001');

 app.get('/', (req, res) => {

    res.send('<h1>home page</h1>');
 });

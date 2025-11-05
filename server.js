const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) =>{
    console.log(req.url, req.method);
    // let's send back some data
    res.setHeader('content-type', 'text/HTML');
    
    let path = './mpn/';
    switch(req.url) {
        case '/':
            path +='index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
            //to redirect the about page to about us
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }



    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        }else{
            // both method is possible
            // res.write(data);
            res.end(data);
        }
        
    });
    

});

 server.listen(3001, 'localhost', () => {
    console.log('listening for requests on port 3000');
 });

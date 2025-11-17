const {Client} = require('pg');
 const express = require('express');
 
 const app = express();
 app.use(express.json());

const conn = new Client({
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "testdb",
    port: 5432,
});
conn.connect().then(()=> console.log("connected to post table"))

// 
app.post('/posts', (req, res) => {

    const {name, id} = req.body;

    const insertQuery = 'INSERT INTO blah (name, id) VALUES ($1,$2)';

     conn.query(insertQuery, [name, id], (err, result) => {
        if (err) {
            res.send(err.message)
     }else{
        console.log(res);
        res.send('data inserted')
     }
})


});

app.listen(3000, () => {
    console.log('server is running ......');
})
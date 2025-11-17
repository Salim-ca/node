const {Client} = require('pg');
const express = require('express');
const app = express();

app.use(express.json());

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "testdb",
})
con.connect().then(() => console.log("connected"));

app.post('/addjson', async(req, res) => {
    const datalist = req.body;
    try{
        for(const item of datalist)
            {    
            const {name, id}= item;
             await  con.query('INSERT INTO blah (name, id) VALUES ($1, $2)', [name, id]);
            } 
            res.send("data inserted successfully");
    }catch(error)
{
    res.send(error)
}
})

app.listen(3000, () => {
    console.log('server started on port 3000');
})
const {Client} = require('pg');

const con = new Client({
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "testdb",
    port: 5432,
});

con.connect().then(()=> console.log("connected"))

con.query('select * from blah',(err, res)=> {
    if(!err){
        console.log(res.rows)
    }else{
        console.log(err.message)
    }
    con.end;
})
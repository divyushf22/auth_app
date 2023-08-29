import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'f22db',
});
connection.connect((err)=>{
    if(err) console.log(err);

    else console.log("Connected to f22 db");
});

export default connection;
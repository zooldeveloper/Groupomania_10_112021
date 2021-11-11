
const mysql = require('mysql');

// Creates connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected...');
	
});

module.exports = db;
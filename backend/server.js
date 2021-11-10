const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'})

// Creates connection
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

// Connect to our DB
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected...');
	
});

const app = express();

app.listen('3001', (req, res) => {
    console.log('It\'s working')
})




// const http = require('http')


// const server = http.createServer((req, res) => {
//     res.end('Server started...');
//     console.log('Our server is working...')
// });


// server.listen(process.env.PORT || 3000)
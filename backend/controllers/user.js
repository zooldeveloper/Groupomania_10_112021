require('dotenv').config({ path: '../config/.env' });
const db = require('../config/database');
const bcrypt = require('bcrypt');


exports.signup = (req, res, next) => {
    console.log(req.body)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    
    db.query('INSERT INTO user (firstName, lastName, email, password, passwordConfirm) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, password, passwordConfirm],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err })
            } else {
                res.status(201).json({ message: 'User created!' })
            }
        });
    //    res.send('It is working...!')
};
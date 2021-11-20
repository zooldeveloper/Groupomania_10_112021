/** @format */
require('dotenv').config({ path: '../config/.env' });
const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

db.connect(err => {
	if (err) {
		console.log(err);
	}
	console.log('Connected to MySql...!' );
});


exports.signup = (req, res) => {

	bcrypt.hash(req.body.password, 8)
        .then(hash => {
            
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let email = req.body.email;
            let password = hash;

            db.query('SELECT email FROM users WHERE email = ?', [`${email}`], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                if (result.length > 0) {
                    if (result[0].active === 'false') {
                        return res.status(402).json({ message: 'This account has been disabled!'})
                    }
                    return res.status(409).json({ message: 'Email is already in use!' })
                } else {
                    db.query('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
                        [`${firstName}`, `${lastName}`, `${email}`, `${password}`],
                        (err, result) => {
                            if (err) {
                                return res.status(500).json(err);
                            } else {
                                res.status(201).json({ message: 'User created!' });
                            }
                        } 
                    );
                }
            });
        }
    )
	.catch(err => res.status(500).json(err));
};

 
exports.login = (req, res) => {

    db.query(`SELECT * FROM users WHERE email = ?`, [`${req.body.email}`],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.length < 1) {
               return res.status(403).json('Email do not exist!')
            } else if (req.body.email === result[0].email) {
                if (result[0].active === 'true') {
                    bcrypt.compare(req.body.password, result[0].password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Password is incorrect!' });
                        }
                        res.status(200).json({
                            userId: result[0].id,
                            token: jwt.sign(
                                { userId: result[0].id },
                                'RANDOM_TOKEN_SECRET', 
                                { expiresIn: '24' }
                            )
                        }); 
                    })
                    .catch(err => res.status(500).json(err));
                } else {
                    return res.status(403).json({ message: "Your account has been deleted!" })
                }
            }
        }
    ); 
};

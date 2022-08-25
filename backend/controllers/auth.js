/** @format */
require('dotenv').config({ path: '../.env' });
const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

db.connect(err => {
	if (err) {
		console.log(err);
	}
	console.log('Connected to MySql...!' );
});

// A signup post request controller
exports.signup = (req, res) => {

    const { firstName, lastName, email, password } = JSON.parse(req.body.user);

    // Hashing and salting the password
	bcrypt.hash(password, 8)
        .then(hash => {
            // Selecting the corresponding email from the users table
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
                    // Inserting the expected values to the users table
                    db.query('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
                        [`${firstName}`, `${lastName}`, `${email}`, `${hash}`],
                        (err, result) => {
                            if (err) {
                                return res.status(500).json(err);
                            } else {
                                res.status(201).json({ message: 'User is created!' });
                            }
                        } 
                    );
                }
            });
        }
    )
	.catch(err => res.status(500).json(err));
};

 
// A login post request controller
exports.login = (req, res) => {

    const { email, password } = JSON.parse(req.body.user);

    // Selecting everything from users table where the email equal to corresponging email
    db.query(`SELECT * FROM users WHERE email = ?`, [`${email}`],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            // Checks if the email is already exist or not
            if (result.length < 1) {
                return res.status(403).json({ message: 'Email do not exist!'})
            } else if (email === result[0].email) {
                // Checks if the user's account is active or not
                if (result[0].active === 'true') {
                    bcrypt.compare(password, result[0].password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Password is incorrect!' });
                        }
                        delete result[0].password
                        res.status(200).json({
                            user: result[0],
                            token: jwt.sign(
                                { userId: result[0].id },
                                process.env.USER_TOKEN, 
                                { expiresIn: '24h' }
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

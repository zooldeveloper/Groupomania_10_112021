/** @format */
require('dotenv').config({ path: '../config/.env' });
const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

db.connect(err => {
	if (err) {
		console.log(err);
	}
	console.log('MySql is connected...!');
});

exports.signup = (req, res, next) => {

	bcrypt.hash(req.body.password, 8)
        .then(hash => {
            
			bcrypt.hash(req.body.passwordConfirm, 8)
                .then(hashConfirm => {
                    
					let firstName = req.body.firstName;
					let lastName = req.body.lastName;
					let email = req.body.email;
					let password = hash;
                    let passwordConfirm = hashConfirm;
                    
                    db.query('INSERT INTO user (firstName, lastName, email, password, passwordConfirm) VALUES (?, ?, ?, ?, ?)',
                        [`${firstName}`,`${lastName}`,`${email}`,`${password}`,`${passwordConfirm}`],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ err });
                            } else {
                                res.status(201).json({ message: 'User created!' });
                            }
                        }
                    );
                    
				})
				.catch(err => res.status(500).json({ error }));
		})
		.catch(err => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {

    db.query(`SELECT * FROM user WHERE id = ${req.params.id}`,
        (err, result) => {
            if (err) {
                console.log(err);
            }

            result.forEach(user => {

                if (req.body.email === user.email) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ Message: 'Password is incorrect!' })
                            }
                            res.status(200).json({
                                userId: user.id,
                                token: jwt.sign(
                                    { userId: user.id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24' }
                                )
                            });
                        })
                        .catch(err => res.status(500).json({ err }))
                }
            });
        }
    );

};

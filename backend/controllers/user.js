/** @format */

require('dotenv').config({ path: '../config/.env' });
let db = require('../config/database');
let bcrypt = require('bcrypt');

db.connect(err => {
	if (err) {
		console.log(err);
	}
	console.log('MySql is connected...!');
});

exports.signup = (req, res, next) => {
	console.log(req.body);

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

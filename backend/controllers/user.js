/** @format */
const db = require('../config/database');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Post request controller 
exports.addDataToUserProfile = (req, res) => { 
	// Checks the body obj whether is empty or not
	function isBodyEmpty(body) {
		if (Object.keys(body).length !== 0) {
			return true;
		}
		return false;
	};
	// Checks the file obj whether is empty or not
	function isFileEmpty(file) {
		if (file !== undefined) {
			return true;
		}
		return false;
    };

	if (isBodyEmpty(req.body) && isFileEmpty(req.file)) {
		// Adds the bio and imageUrl to the database
		const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
		db.query(`UPDATE users SET bio = '${req.body.bio}', imageUrl = '${imageUrl}' WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(201).json({ message: "User's profile's data have been saved!" });
			}
		);
    }
	else if (isBodyEmpty(req.body) && !isFileEmpty(req.file)) {
		// Adds only the bio to the database
		db.query(`UPDATE users SET bio = '${req.body.bio}' WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(201).json({ message: "User's profile's bio has been saved!" });
			}
		);
    }
	else if (!isBodyEmpty(req.body) && isFileEmpty(req.file)) {
		// Adds only the imageUrl to the database
		const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
		db.query(`UPDATE users SET imageUrl = '${imageUrl}' WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(201).json({ message: "User's profile image has been saved!" });
			}
		);
    }
    else {
		return res.status(403).json({ message: 'Nothing has been sent!' });
	}
};


// Get request controller
exports.getOneUser = (req, res) => {
	// Selects user's data from the database and send them as a response
    db.query(`SELECT id, firstName, lastName, email, bio, imageUrl  FROM users WHERE id = ?`, [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        }
	);
};


// Put request controller
exports.modifiyOneUser = (req, res) => {
	
	if (req.body.passwords) {
		// Replaces the old user's password with new one
		const ueserPasswords = {
			...req.body.passwords,
		};
		db.query(`SELECT password FROM users WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				bcrypt
					.compare(ueserPasswords.old_pw, result[0].password)
					.then(valid => {
						if (!valid) {
							return res
								.status(401)
								.json({ message: 'Password is not correct!' });
						}
						bcrypt
							.hash(ueserPasswords.new_pw, 8)
							.then(hash => {
								db.query(
									`UPDATE users SET password = '${hash}' WHERE id = ${req.params.id}`,
									(err, result) => {
										if (err) {
											return res.status(500).json(err);
										}
										return res
											.status(200)
											.json({ message: 'Your password has been updated!' });
									}
								);
							})
							.catch(err => res.status(500).json(err));
					})
					.catch(err => res.status(500).json(err));
			}
		);
	} else if (req.body.newEmail) {
		// Changes the old user's email with the new one
		db.query(`SELECT email FROM users WHERE email = ${req.body.newEmail}`,
			(err, resulat) => {
				if (err) {
					return res.status(500).json(err);
				}
				if (resulat.length > 0) {
					return res.status(409).json({ message: 'Email is already in use!' })
				}
				db.query(`UPDATE users SET email = '${req.body.newEmail}' WHERE id = ${req.params.id}`,
					(err, result) => {
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json({ message: 'Your email has been updated!' });
					}
				);
			}
		);
	} else if (req.body.bio) {
		// Modifies the user's bio
		db.query(`UPDATE users SET bio = ${req.body.bio} WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json({ message: 'Your bio has been updated!' });
			}
		);
	} else if (req.file) {
		// Replaces the user's profile image 
		const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
		db.query(`UPDATE users SET imageUrl = '${imageUrl}' WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json({ message: 'Your profile image has been updated!' });
			}
		);
	}
};


// Delete request controlller 
exports.deleteOneUser = (req, res) => {
	// Romves the bio from the database
	if (req.body.bioToDelete) {
		db.query(`UPDATE users SET bio = NULL WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json({ message: 'Your bio has been successfully deleted!' });
			}
		);
	} else if (req.body.imageToDelete) {
		// Removes the image from the database and images directory
		db.query(`SELECT imageUrl FROM users WHERE id = ${req.params.id}`,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				const filename = result[0].imageUrl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					db.query(`UPDATE users SET imageUrl = NULL WHERE id = ${req.params.id}`,
						(err, result) => {
							if (err) {
								return res.status(500).json(err);
							}
							return res.status(200).json({ message: 'Your profile image has been successfully deleted!' })
						}
					);
				});
			}
		);
	}
};  
  
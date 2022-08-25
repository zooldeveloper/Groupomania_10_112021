/** @format */
const db = require('../config/database');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Post request controller 
exports.addDataToUserProfile = (req, res) => {
	// Checks the body obj whether is empty or not
	function isBodyEmpty(bio) {
		if (bio !== null) {
			return true;
		}
		return false;
	};
	// // Checks the file obj whether is empty or not
	function isFileEmpty(file) {
		if (file !== undefined) {
			return true;
		}
		return false;
    }; 

	if (req.body.bio && isFileEmpty(req.file)) {
		// Adds the bio and imageUrl to the database
		const imageUrl = `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`;
		db.query(`UPDATE users SET bio = ?, imageUrl = ? WHERE id = ?`,
			[`${req.body.bio}`, `${imageUrl}`, req.params.id],
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(201).json({ message: "User profile data has been saved!" });
			}
		);
    }
	else if (req.body.bio && !isFileEmpty(req.file)) {
		// Adds only the bio to the database
		db.query(`UPDATE users SET bio = ? WHERE id = ?`,
			[`${req.body.bio}`, req.params.id],
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(201).json({ message: "Your bio has been saved!" });
			}
		);
    }
	else if (!req.body.bio && isFileEmpty(req.file)) {
		// Adds only the imageUrl to the database
		const imageUrl = `${req.protocol}://${req.get('host')}/images/profiles${req.file.filename}`;
		db.query(`UPDATE users SET imageUrl = ? WHERE id = ?`,
			[`${imageUrl}`, req.params.id],
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(201).json({ message: "Your image has been saved!" });
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
    db.query(`SELECT * FROM users WHERE id = ?`, req.params.id,
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
			}
			delete result[0].password;
            res.status(200).json(result);
        }
	);
};


// Patch request controller
exports.modifiyOneUser = (req, res) => {
	
	if (req.body.passwords != 'undefined') {
		const { newPassword, oldPassword  } = JSON.parse(req.body.passwords);
		
		// Replaces the old user's password with new one
		db.query(`SELECT password FROM users WHERE id = ?`, req.params.id,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				bcrypt.compare(oldPassword, result[0].password)
					.then(valid => {
						if (!valid) {
							return res.status(401).json({ message: 'Password is not correct!' });
						}
						bcrypt.hash(newPassword, 8)
							.then(hash => {
								db.query(`UPDATE users SET password = '${hash}' WHERE id = ?`, req.params.id,
									(err, result) => {
										if (err) {
											return res.status(500).json(err);
										}
										return res.status(200).json({ message: 'Your password has been updated!' });
									}
								);
							})
							.catch(err => res.status(500).json(err));
					})
					.catch(err => res.status(500).json(err));
			}
		);
	} else if (req.body.newEmail != 'undefined') {
		const { newEmail } = JSON.parse(req.body);
		// Changes the old user's email with the new one
		db.query(`SELECT email FROM users WHERE email = ?`, `${newEmail}`,
			(err, resulat) => {
				if (err) {
					return res.status(500).json(err);
				}
				if (resulat.length > 0) {
					return res.status(409).json({ message: 'Email is already in use!' })
				}
				db.query(`UPDATE users SET email = ? WHERE id = ?`,
					[`${newEmail}`, req.params.id],
					(err, result) => {
						if (err) {
							return res.status(500).json(err);
						}
						return res.status(200).json({ message: 'Your email has been updated!' });
					}
				);
			}
		);
	} 
	else if (req.body.bio != 'undefined' && req.body.bio != 'null' && req.body.jobTitle != 'undefined' && req.body.jobTitle != 'null') {
		// Upadtes user's job title & user's bio
		db.query(`UPDATE users SET bio = ?, jobTitle = ? WHERE id = ?`,
			[`${req.body.bio}`, `${req.body.jobTitle}`, req.params.id],
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json({ message: 'Your bio and job title have been updated!' });
			}
		);
	} else if (req.body.jobTitle != 'undefined' && req.body.jobTitle != 'null' && req.body.bio == 'null') {
		// Updates user's jobTitle
		db.query(`UPDATE users SET jobTitle = ? WHERE id = ?`,
			[`${req.body.jobTitle}`, req.params.id],
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json({ message: 'Your job title has been updated!' });
			}
		);
	}
	else if (req.body.bio != 'undefined' && req.body.bio != 'null' && req.body.jobTitle == 'null') {
		// Updates user's bio
		db.query(`UPDATE users SET bio = ? WHERE id = ?`,
			[`${req.body.bio}`, req.params.id],
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json({ message: 'Your bio has been updated!' });
			}
		);
	} else if (req.file) {
		// Replaces the user's profile image 
		const imageUrl = `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`;
		db.query(`UPDATE users SET imageUrl = ? WHERE id = ?`,
			[`${imageUrl}`, req.params.id],
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

// The commented lines below are not used for now!

	// Romves the bio from the database
	// if (req.body.bioToDelete) {
	// 	db.query(`UPDATE users SET bio = NULL WHERE id = ${req.params.id}`,
	// 		(err, result) => {
	// 			if (err) {
	// 				return res.status(500).json(err);
	// 			}
	// 			return res.status(200).json({ message: 'Your bio has been successfully deleted!' });
	// 		}
	// 	);
	// } else if (req.body.imageToDelete) {
	// 	// Removes the image from the database and images directory
	// 	db.query(`SELECT imageUrl FROM users WHERE id = ${req.params.id}`,
	// 		(err, result) => {
	// 			if (err) {
	// 				return res.status(500).json(err);
	// 			}
	// 			const filename = result[0].imageUrl.split('/profiles/')[1];
	// 			fs.unlink(`images/profiles/${filename}`, () => {
	// 				db.query(`UPDATE users SET imageUrl = NULL WHERE id = ${req.params.id}`,
	// 					(err, result) => {
	// 						if (err) {
	// 							return res.status(500).json(err);
	// 						}
	// 						return res.status(200).json({ message: 'Your profile image has been successfully deleted!' })
	// 					}
	// 				);
	// 			});
	// 		}
	// 	);
	// } else if (req.body.accountToDelete) {
	// 	// Disables the user's account
		db.query(`UPDATE users SET active = 'false' WHERE id = ?`, req.params.id,
			(err, result) => {
				if (err) {
					return res.status(500).json(err);
				}
				res.status(200).json({ message: 'Your account has been permanently deleted!!' });
			}
		);
	// }
};   
  
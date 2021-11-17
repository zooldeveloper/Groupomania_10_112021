/** @format */
const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

    db.query(`SELECT id, firstName, lastName, email, bio, imageUrl  FROM users WHERE id = ?`, [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        }
	);
};

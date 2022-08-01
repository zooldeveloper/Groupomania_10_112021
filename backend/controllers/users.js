/** @format */
const db = require('../config/database');

exports.getAllUsers = (req, res) => {
	// Selects all users data from the database and send them as a response
	db.query(`SELECT * FROM users`, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}
		for (let i = 0; i < result.length; i++) {
			delete result[i].password;
		}
		
		res.status(200).json(result);
	});
};

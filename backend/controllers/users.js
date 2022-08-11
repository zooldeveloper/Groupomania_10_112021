/** @format */
const db = require('../config/database');

exports.getAllUsers = (req, res) => {

	// Selects all users and subscribers data that matches the conditions
	db.query(`SELECT users.id, users.firstName, users.lastName, users.email, users.imageUrl, users.bio, users.jobTitle, users.isAdmin,
			(SELECT COALESCE(COUNT(subscribed_user),0) FROM subscribers WHERE profile_owner = users.id AND subscriber_status = 'true') AS subscribersNum,
			(SELECT GROUP_CONCAT(subscribed_user) FROM subscribers WHERE profile_owner = users.id AND subscriber_status = 'true') AS subscribedUsers 
			FROM subscribers
			JOIN users
			WHERE users.active = 'true'
			GROUP BY users.id
			ORDER BY users.id ASC`, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(200).json(result);
	});
};

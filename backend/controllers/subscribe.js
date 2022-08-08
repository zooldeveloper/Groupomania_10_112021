const db = require('../config/database');


// Creates and updates request controller 
exports.createAndUpdateSubscribers = (req, res) => {
    
    const { subscriber_status, profile_owner, subscribed_user } = req.body;
    console.log(req.body)
    if (subscriber_status === 'true') {
        // Selects the subscriber_status column that matches the conditions
        db.query('SELECT subscriber_status FROM subscribers WHERE profile_owner = ? AND subscribed_user = ?',
        [profile_owner, subscribed_user], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                // Updates the subscriber_status columns that matches the condition
                db.query('UPDATE subscribers SET subscriber_status = ? WHERE profile_owner = ? AND subscribed_user = ?',
                    [subscriber_status, profile_owner, subscribed_user], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).json({ message: "Vous êtes de nouveau abonné !" });
                    });
        
            } else {
                // Inserts subscriber status, profile owner andsubscribed user to the subscribers table
                db.query('INSERT INTO subscribers ( subscriber_status, profile_owner, subscribed_user ) VALUES (?, ?, ?)',
                [subscriber_status, profile_owner, subscribed_user], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({ message: "Vous êtes désormais abonné !" });
                });
            }
        })        
    } else if (subscriber_status === 'false') {
        // Updates the subscriber status columns that matches the condition
        db.query('UPDATE subscribers SET subscriber_status = ? WHERE profile_owner = ? AND subscribed_user = ?',
        [subscriber_status, profile_owner, subscribed_user], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: "Vous êtes plus abonné !" });
        });
    }
    
};


// Get request controller 
exports.getAllSubscribers = (req, res) => {
// Selects all the likes and dislikes of a specific post that matches the condtion
    db.query(`SELECT * FROM subscribers`,
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(result);
        });
};
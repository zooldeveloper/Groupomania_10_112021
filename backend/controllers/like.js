const db = require('../config/database');


// Create and update request controller 
exports.createAndUpdateLikes = (req, res) => {

    const { like, post_id, user_id } = req.body;

    if (like === 1) {
        // Inserts like, post id and user id to the likes table
        db.query('INSERT INTO likes ( likes, post_id, users_liked ) VALUES (?, ?, ?)',
            [1, post_id, user_id], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ message: "Added a like!" });
            });
            
    } else if (like === -1) {
        // Inserts dislike, post id and user id to the likes table
        db.query('INSERT INTO likes (dislikes, post_id, users_disliked ) VALUES (?, ?, ?)',
            [1, post_id, user_id], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ message: "Added a dislike!" });
        });
        
    } if (like === 0) {
        // Selects the likes column that matches the conditions
        db.query('SELECT likes FROM likes WHERE post_id = ? AND users_liked = ?',
            [post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
            // Updates the likes and users_liked columns that matches the condition
            db.query('UPDATE likes SET likes = 0, users_liked = NULL WHERE post_id = ? AND users_liked = ?',
                [post_id, user_id], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).json({ message: "Like updated!" });
                });
            
            } else if (result.length < 1) {
                // Selects the dislikes column that matches the conditions
                db.query('SELECT dislikes FROM likes WHERE post_id = ? AND users_disliked = ?',
                    [post_id, user_id], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        if (result.length > 0) {
                            // Updates the dislikes column that matches the conditions
                            db.query('UPDATE likes SET dislikes = 0, users_disliked = NULL WHERE post_id = ? AND users_disliked = ?',
                                [post_id, user_id], (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
                                    res.status(200).json({ message: "Dislike updated!" });
                                });
                        } 
                    });
            }
        });
           
    }
};


// Get request controller 
exports.getLikesAndDislikes = (req, res) => {
// Selects all the likes and dislikes of a specific post that matches the condtion
    db.query('SELECT SUM(likes) AS likes, SUM(dislikes) AS dislikes FROM likes JOIN posts ON likes.post_id = posts.post_id WHERE posts.post_id = ?',
        req.body.post_id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(result);
        });
};
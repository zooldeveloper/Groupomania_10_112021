const db = require('../config/database');


// Create and update request controller 
exports.createAndUpdateLikes = (req, res) => {
    
    const { like, dislike, post_id, user_id } = req.body;

    if (like === 1) {
        // Selects the likes column that matches the conditions
        db.query('SELECT likes FROM post_likes WHERE post_id = ? AND users_liked = ?',
        [post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                // Updates the likes and users_liked columns that matches the condition
                db.query('UPDATE post_likes SET likes = ? WHERE post_id = ? AND users_liked = ?',
                    [like, post_id, user_id], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).json({ message: "Added a like!" });
                    });
        
            } else {
                // Inserts like, post id and user id to the post_likes table
                db.query('INSERT INTO post_likes ( likes, post_id, users_liked ) VALUES (?, ?, ?)',
                [like, post_id, user_id], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({ message: "Added a like!" });
                });
            }
        })        
    } else if (like === 0) {
        // Updates the likes and users_liked columns that matches the condition
        db.query('UPDATE post_likes SET likes = ? WHERE post_id = ? AND users_liked = ?',
        [like, post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: "Like removed!" });
        });
    }
    
    if (dislike === 1) {
        // Selects the dislikes column that matches the conditions
        db.query('SELECT dislikes FROM post_likes WHERE post_id = ? AND users_disliked = ?',
        [post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                // Updates the dislikes column that matches the conditions
                db.query('UPDATE post_likes SET dislikes = ? WHERE post_id = ? AND users_disliked = ?',
                    [dislike, post_id, user_id], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).json({ message: "Added a dislike!" });
                });
            } else {
                // Inserts dislike, post id and user id to the post_likes table
                db.query('INSERT INTO post_likes (dislikes, post_id, users_disliked ) VALUES (?, ?, ?)',
                [dislike, post_id, user_id], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({ message: "Added a dislike!" });
                });
            }
        });
        
    } else if (dislike === 0) {
        // Updates the dislikes column that matches the conditions
        db.query('UPDATE post_likes SET dislikes = ? WHERE post_id = ? AND users_disliked = ?',
        [dislike, post_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: "Dislike removed!" });
        });
    }
};


// Get request controller 
exports.getLikesAndDislikes = (req, res) => {
// Selects all the likes and dislikes of a specific post that matches the condtion
    db.query(`SELECT post_id, likes, dislikes, users_liked, users_disliked FROM post_likes`,
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(result);
        });
};
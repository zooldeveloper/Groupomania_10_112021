const db = require('../config/database');


// Post request controller
exports.createComment = (req, res) => {

    const { comment, post_id, user_id } = req.body;
    const event = new Date(Date.now());
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timestamp = event.toLocaleDateString('en-Us', options);
    // Inserts the specified data into the comments table
    db.query('INSERT INTO comments (comment, post_id, user_id, creation_date) VALUES (?, ?, ?, ?)',
        [`${comment}`, post_id, user_id, timestamp], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ message: 'Comment added!' });
        });
};


// Get request controller
exports.getComment = (req, res) => {
    // Gets all data from the comments table that matches the condition
    db.query(`SELECT firstName, lastName, imageUrl, comment,
                comment_id, comments.post_id, comments.user_id, comments.creation_date FROM comments
                JOIN posts ON comments.post_id = posts.post_id
                JOIN users ON comments.user_id = users.id
                WHERE users.active = 'true'
                ORDER BY comments.comment_id ASC`,
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send(result);
        });
};


// Update request controller 
exports.updateComment = (req, res) => {

    const { comment } = req.body;
    // Updates the comment & creation_date columns that matches the condition
    db.query('UPDATE comments SET comment = ?  WHERE comment_id = ?',
        [`${comment}`, req.params.id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: 'Comment updated!' });
        });
};


// Delete request controller
exports.deleteComment = (req, res) => {
    // Deletes a row of specific comment that matches the condition
    db.query('DELETE FROM comments WHERE comment_id = ?',
        req.params.id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: 'Comment deleted!' });
        });
    
};
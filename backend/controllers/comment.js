const db = require('../config/database');


// Post request controller
exports.createComment = (req, res) => {

    const { comment, post_id, user_id } = req.body;
    const event = new Date(Date.now());
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timestamp = event.toLocaleDateString('en-FR', options);
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
                ORDER BY comments.creation_date ASC`,
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
    const event = new Date(Date.now());
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timestamp = event.toLocaleDateString('en-FR', options);
    // Updates the comment & creation_date columns that matches the condition
    db.query('UPDATE comments SET comment = ?, creation_date = ?  WHERE comment_id = ?',
        [`${comment}`, timestamp, req.params.id], (err, result) => {
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
const db = require('../config/database');


// Post request controller
exports.createComment = (req, res) => {

    const { comment, post_id, user_id } = req.body;
    // Inserts the specified data into the comments table
    db.query('INSERT INTO comments (comments, post_id, user_id, comment_creation_date) VALUES (?, ?, ?, ?)',
        [`${comment}`, post_id, user_id, new Date()], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ message: 'Comment added!' });
        });
};


// Get request controller
exports.getComment = (req, res) => {
    // Gets all data from the comments table that matches the condition
    db.query('SELECT * FROM comments JOIN posts ON comments.post_id = posts.post_id',
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send(result);
        });
};


// Update request controller 
exports.updateComment = (req, res) => {

    const { comment } = req.body;
    // Updates the comments & comment_creation_date columns that matches the condition
    db.query('UPDATE comments SET comments = ?, comment_creation_date = ?  WHERE comment_id = ?',
        [`${comment}`, new Date(), req.params.id], (err, result) => {
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
const db = require('../config/database');


// 
exports.createComment = (req, res) => {

    const { comment, post_id, user_id } = req.body;

    db.query('INSERT INTO comments (comments, post_id, user_id, comment_creation_date) VALUES (?, ?, ?, ?)',
        [`${comment}`, post_id, user_id, new Date()], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ message: 'Comment added!' });
        });
};


// 
exports.getComment = (req, res) => {
    
    db.query('SELECT * FROM comments JOIN posts ON comments.post_id = posts.post_id',
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send(result);
        });
};


// 
exports.updateComment = (req, res) => {

    const { comment } = req.body;

    db.query('UPDATE comments SET comments = ?, comment_creation_date = ?  WHERE comment_id = ?',
        [`${comment}`, new Date(), req.params.id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: 'Comment updated!' });
        });
};


// 
exports.deleteComment = (req, res) => {

    db.query('DELETE FROM comments WHERE comment_id = ?',
        req.params.id, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ message: 'Comment deleted!' });
    })
    
};
const db = require('../config/database');


exports.creatPost = (req, res) => {
    
    const body = req.file ?
        {
            ...req.body,
            image_url: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
        } : { ...req.body };
    
    db.query(`INSERT INTO posts (textual_post, image_url, creation_date, user_id) VALUES (?, ?, ?, ?)`,
        [`${body.textual_post}`, `${body.image_url}`, new Date(), req.params.id],
        (err, result) => { 
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(result)
        }
    );
};

exports.getAllPosts = (req, res) => {

    db.query(`SELECT * FROM posts JOIN users ON posts.user_id = users.id WHERE users.active = 'true'`,
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            let postData = [];
            for (let i = 0; i < result.length; i++ ) {
                delete result[i].password;
                postData.push(result[i]);
            }
           res.status(200).json(result);
        }
    );
};

exports.modifiyPost = (req, res) => {
    
    const body = req.file ?
        {
            ...req.body,
            image_url: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
        } : { ...req.body };
    
    db.query(`UPDATE posts SET textual_post = ?, image_url = ?, creation_date = ? WHERE post_id = ?`,
        [`${body.textual_post}`, `${body.image_url}`, new Date(), `${req.params.id}`],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        }
    );

};
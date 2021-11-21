const db = require('../config/database');


exports.creatPost = (req, res) => {
    
    const body = req.file ?
        {
            ...req.body,
            image_url: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
        } : { ...req.body };
    
    db.query(`INSERT INTO posts (textual_post, image_url, post_date, user_id) VALUES (?, ?, ?, ?)`,
        [`${body.textual_post}`, `${body.image_url}`, new Date(), req.params.id],
        (err, result) => { 
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(result)
            // console.log(result)
        }
    );

};   
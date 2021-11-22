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

exports.deletePost = (req, res) => {

    // const body = req.body.textualPostToDelelte && req.body.imagePostToDelelte ?
    //     { ...req.body, } : req.body.textualPostToDelelte ?
    //     { ...req.body, } : { ...req.body };
    
    if(req.body.textualPostToDelelte && req.body.imagePostToDelelte) {
        // Selects all the data from the posts table whose id is equal to the id sent by the request
        db.query(`SELECT * FROM posts WHERE post_id = ?`, req.params.id,
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                let deleted_posts = [];
                for (let obj of result) {
                    deleted_posts.push(obj);
                }
                // Inserts the deleted data into the deleted_posts table
                db.query(`INSERT INTO deleted_posts (post_id, textual_post, image_url, creation_date, user_id) VALUES (?, ?, ?, ?, ?)`,
                    [deleted_posts[0].post_id, `${deleted_posts[0].textual_post}`, `${deleted_posts[0].image_url}`, `${deleted_posts[0].creation_date}`, deleted_posts[0].user_id],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(result)    
                    }
                );
            }
        );
        // Removes all the data from posts table where the id is equal to the id sent by the request
        db.query(`DELETE FROM posts WHERE post_id = ?`, req.params.id,
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(result);
            }
        );
    }
}; 
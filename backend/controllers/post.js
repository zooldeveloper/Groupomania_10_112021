const db = require('../config/database');
const fs = require('fs');

// Post request controller
exports.creatPost = (req, res) => {
    const body = req.file ?
        {
            ...req.body,
            image_url: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
        } : { ...req.body };

    const event = new Date(Date.now());
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric' };
    const timestamp = event.toLocaleDateString('en-FR', options);
    // Inserrs data into the posts table
    db.query(`INSERT INTO posts (textual_post, image_url, creation_date, user_id) VALUES (?, ?, ?, ?)`,
        [body.textual_post, body.image_url, timestamp, req.params.id],
        (err, result) => { 
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json({ message: "Post a été enregistré !"})
        }
    );
};


// Get request controller for all posts
exports.getAllPosts = (req, res) => {
    // Gets all the data from posts & users tables based on conditions
           
    db.query(`SELECT users.id, users.firstName, users.lastName, users.imageUrl, isAdmin,
                posts.post_id, posts.textual_post, posts.image_url, posts.creation_date,
                (SELECT COALESCE(SUM(likes),0) FROM post_likes WHERE post_id = posts.post_id) AS likes, 
                (SELECT COALESCE(SUM(dislikes),0) FROM post_likes WHERE post_id = posts.post_id) AS dislikes,
                (SELECT COALESCE(COUNT(comment),0) FROM comments WHERE post_id = posts.post_id) AS comments FROM users
                JOIN posts ON users.id = posts.user_id 
                JOIN post_likes 
                JOIN comments
                WHERE users.active = 'true'
                GROUP BY posts.post_id
                ORDER BY posts.creation_date DESC`,
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            let postData = [];
            for (let i = 0; i < result.length; i++ ) {
                postData.push(result[i]);
            }
           res.status(200).json(result);
        }
    );
};


// Put request controller
exports.modifiyPost = (req, res) => {
// The commented lines below are not used for now!
    // const body = req.file ?
    //     {
    //         ...req.body,
    //         image_url: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
    //     } : { ...req.body };
    const event = new Date(Date.now());
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric' };
    const timestamp = event.toLocaleDateString('en-FR', options);
    // Updates posts table content
    db.query(`UPDATE posts SET textual_post = ?, creation_date = ? WHERE post_id = ?`,
        [`${req.body.textual_post}`,  timestamp, `${req.params.id}`],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json({ message: "Post a été modifié !"});
        }
    );

};


// Delete request controller
exports.deletePost = (req, res) => {
    
    // Selects all the data from the posts table whose id is equal to the id sent by the request
    db.query(`SELECT * FROM posts WHERE post_id = ?`, req.params.id,
        (err, postResult) => {
            if (err) {
                return console.log(err)
            };
            let deleted_posts = [];
            for (let obj of postResult) {
                deleted_posts.push(obj);
            }
            // Inserts the deleted data into the deleted_posts table
            db.query(`INSERT INTO deleted_posts (post_id, textual_post, image_url, creation_date, user_id) VALUES (?, ?, ?, ?, ?)`,
                 [deleted_posts[0].post_id, `${deleted_posts[0].textual_post}`, `${deleted_posts[0].image_url}`, `${deleted_posts[0].creation_date}`, deleted_posts[0].user_id],
                (err, deletedPostResult) => {
                    if (err) {
                        return console.log(err);
                    };
                    if(postResult[0].image_ur != null ) {
                        const filename = postResult[0].image_url.split('/posts/')[1];
                        fs.unlink(`images/posts/${filename}`, () => {
                            // Removes all the data from posts table where the id is equal to the id sent by the request
                            db.query(`DELETE FROM posts WHERE post_id = ?`, req.params.id,
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).json(err);
                                    }
                                    res.status(200).json({ message: "Post a été supprimé !" });
                                }
                            );
                        });
                    } else {
                        db.query(`DELETE FROM posts WHERE post_id = ?`, req.params.id,
                            (err, result) => {
                                if (err) {
                                    return res.status(500).json(err);
                                }
                                res.status(200).json({ message: "Post a été supprimé !" });
                            }
                        );
                    }   
                });
        });
}; 
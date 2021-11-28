const jwt = require('jsonwebtoken');

// Checks if the authentication matches 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user Id!';
        } else {
            next();
        }
    } catch (err){
        res.status(401).json({ message: err });
    }
};
  
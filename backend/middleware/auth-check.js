const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

// Checks if the authentication matches u
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
        const now = Date.now() / 1000;
        if (decodedToken.exp < now) {
            throw 'Please provid a valid token!' 
        }
        else {
            next();
        } 
    } catch {
        res.status(401).json({ 
            Error: 'User is not authorized, Please provid a valid token!' });
    }
};
  
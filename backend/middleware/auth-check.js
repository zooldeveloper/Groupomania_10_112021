const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

// Checks if the authentication matches u
module.exports = (req, res, next) => {
    const handleThrow = (message) => {
        throw message;
    }
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
            const now = Date.now() / 1000;
            decodedToken.exp < now ?
                handleThrow('Please provid a valid token!') : next();
        } catch (err){
            new Error(err);
        }
};
  
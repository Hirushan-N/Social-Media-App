const jwt = require('jsonwebtoken');

const IsAPIAuthenticate = true; // set as false for testing

module.exports = (req, res, next) => {
    try {
        if(IsAPIAuthenticate){
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,'Secret');
            req.userData = decoded;
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized Access'
        });
    }
};
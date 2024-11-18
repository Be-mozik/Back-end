const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];    
    if (!token) {
        return res.status(403).send('Token required');
    }
    console.log(token);
    
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(400).send('Token mal formaté');
    }
    const tokenWithoutBearer = tokenParts[1];
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid or expired token');
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log(authHeader)
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized. Token missing or malformed.' });
    }
  
    const token = authHeader.replace('Bearer ', '');
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
  };

module.exports = authenticate;
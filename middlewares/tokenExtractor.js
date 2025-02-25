const jwt = require('jsonwebtoken');


const tokenExtractor=(req, res, next) => {
  let token = null;

    // Check for token in Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1]; 
    } 
    // Check for token in Query Params (optional)
    else if (req.query.token) {
        token = req.query.token;
    }

    // If token is missing, return error
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify token and attach decoded user data to request object
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        req.user = decoded; // Attach decoded user info (e.g., user ID) to `req.user`
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
}



module.exports ={ tokenExtractor };
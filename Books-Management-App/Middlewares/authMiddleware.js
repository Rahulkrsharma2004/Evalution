// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing Token' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user to the request for further use
    req.user = decoded.user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification failure
    return res.status(401).json({ error: 'Unauthorized: Invalid Token' });
  }
};

module.exports = authMiddleware;

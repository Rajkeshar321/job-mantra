import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    console.log('Auth header received:', authHeader ? 'Yes' : 'No');
    console.log('Token extracted:', token ? 'Yes' : 'No');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
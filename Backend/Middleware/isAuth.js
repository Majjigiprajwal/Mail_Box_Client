const jwt = require('jsonwebtoken');
const User = require('../Models/user'); 

module.exports = async function(req, res, next) {

  const token = req.header('Authorization')?.replace('Bearer ', '');

  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Token is not valid' });
    }
    console.log(user)
    req.user = user;
    next();

  } 

  catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }

};

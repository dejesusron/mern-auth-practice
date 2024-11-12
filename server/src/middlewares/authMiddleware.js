import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // get the token from the header
    token = req.headers.authorization.split(' ')[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user from the token
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } else {
    res.status(401);
    throw new Error('Unauthorized: Token required');
  }
});

export { protect };

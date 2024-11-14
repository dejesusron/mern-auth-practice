import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../middlewares/tokenMiddleware.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// @desc: Get all users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

// @desc: Get a user
// @route: GET /api/users/:id
// @access: Private
const getUser = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error('Not authorized');
  }
});

// @desc: Add a new user
// @route: POST /api/users
// @access: Public
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // fill add the fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  // check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create the user
  const user = await User.create({ name, email, password: hashedPassword });

  // add jwt token
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc: Update a user
// @route: PUT /api/users/:id
// @access: Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // check if the user exists
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // check if the email already in use
  const { email } = req.body;

  const emailUsed = await User.findOne({ email });

  if (emailUsed) {
    res.status(400);
    throw new Error('Email already in use');
  }

  // update the user
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // display the updated user
  res.status(200).json(updatedUser);
});

// @desc: delete a user
// @route: DELETE /api/users/:id
// @access: Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // check if user Exists
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // delete the user
  await user.deleteOne();

  res.status(200).json(user.id);
});

// @desc: authenticate a user
// @route: POST /api/users/signin
// @access: Public
const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // fill all the fields
  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  const user = await User.findOne({ email });

  // check if user exists
  // comparing the input password to the password save on the collection
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc: authenticate a user using google
// @route: POST /api/users/google
// @access: Public
const signinGoogle = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user using goggle info's
  const newUser = await User.create({ name, email, password: hashedPassword });

  // add jwt token
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
      message: 'New user',
    });
  }
});

// @desc: forgot a password
// @route: POST /api/users/forgot-password
// @access: Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not exist');
  }

  const token = generateToken(user._id);
  // res.status(200).json(token);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  // send mail with defined transport object
  const mailOptions = {
    from: '"Auth practice" <dejesusronel29@gmail.com>',
    to: `dejesusronel29@gmail.com, ${email}`,
    subject: 'Reset your password',
    // text: `http://localhost:3000/reset-password/${user._id}/${token}`,
    text: `
    Hi,

    You recently requested to reset your password for Auth-practice.

    To reset your password, please click the following link:

    http://localhost:3000/reset-password/${user._id}/${token}

    If you didn't request a password reset, please ignore this email.

    Best regards,
    Ron De jesus`,
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.status(400);
      throw new Error(err);
    } else {
      res.status(200).json({ message: 'Email successfully sent!' });
    }
  });
});

// @desc: reset password
// @route: POST /api/users/reset-password/:id/:token
// @access: Public
const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      res.status(400);
      throw new Error('Error with token');
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({ message: 'Password successfully changed' });
    }
  });

  return decoded;
});

export {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  signinUser,
  signinGoogle,
  forgotPassword,
  resetPassword,
};

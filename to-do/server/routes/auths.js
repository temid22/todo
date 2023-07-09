import express from 'express';
import TaskUsers from '../model/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isJson, isGmail } from '../middlewares/auth.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// REGISTER

router.post('/register', isJson, isGmail, async (req, res) => {
  // check if all fields are empty or not
  if (
    (req.body.email === '' || req.body.email === null,
    req.body.password === '' || req.body.password === null)
  ) {
    res.status(400).send(`Please fill all fields!`);
  }

  const newUser = new TaskUsers(req.body);
  try {
    const saveUser = await newUser.save();
    res.status(201).send(saveUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// LOGIN

router.post('/login', isJson, isGmail, async (req, res) => {
  // check if all fields are empty or not
  if (
    (req.body.email === '' || req.body.email === null,
    req.body.password === '' || req.body.password === null)
  ) {
    res.status(400).send(`Please fill all fields!`);
  }

  try {
    // check the database for the user
    const user = await TaskUsers.findOne({ email: req.body.email });

    if (user) {
      const hashedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      const { password, ...others } = user._doc;

      // create accessToken
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );

      if (hashedPassword) {
        console.log({ ...others, accessToken, message: `Valid Password` });
        res.status(200).send({
          ...others,
          accessToken,
          message: `Valid Password`,
        });
      } else {
        res.status(400).send(`Invalid Password!`);
      }
    } else {
      res.status(401).send(`User does not exist!`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/logout', verifyToken, (req, res) => {
  const authHeader = req.headers.authorization;

  jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send('You have been logged out!');
    } else {
      res.send('Error');
    }
  });
});

export default router;

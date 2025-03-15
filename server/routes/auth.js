const express = require('express');
const  User  = require("../db/userDB/models/User");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    // console.log('Received request body:', req.body); // Log the request body
    const { name, email, password } = req.body;
    try {
      const user = await User.register(name, email, password);
      res.status(201).json({ user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "Confidential", { expiresIn: '1h' });
      res.json({ token, user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;
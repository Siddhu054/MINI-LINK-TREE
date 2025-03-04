import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Registration attempt:', { email, name }); // Log registration data

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new UserModel({
      name,
      email,
      password // Will be hashed by pre-save hook
    });

    await user.save();
    console.log('User saved successfully:', {
      id: user._id,
      email: user.email,
      name: user.name
    });

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Send response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Add this temporary route to clear users (DELETE AFTER TESTING)
router.delete('/clear-users', async (req, res) => {
  try {
    await UserModel.deleteMany({});
    console.log('All users deleted');
    res.json({ message: 'All users deleted' });
  } catch (err) {
    console.error('Error clearing users:', err);
    res.status(500).json({ error: 'Failed to clear users' });
  }
});

export default router; 
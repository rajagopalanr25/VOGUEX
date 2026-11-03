import jwt from 'jsonwebtoken';
import { store } from '../utils/dataStore.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'voguex_luxury_fashion_jwt_secret_2026_super_secure', {
    expiresIn: '30d',
  });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = store.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. Please verify your email and password.' });
    }

    const isMatch = await store.verifyPassword(user, password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Password does not match.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      avatar: user.avatar,
      addresses: user.addresses || [],
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const userExists = store.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email address already exists' });
    }

    const user = await store.createUser({ name, email, password, role: 'customer' });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      avatar: user.avatar,
      addresses: user.addresses || [],
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = store.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      avatar: user.avatar,
      addresses: user.addresses || [],
      wishlist: user.wishlist || []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = store.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.avatar = req.body.avatar || user.avatar;
    if (req.body.addresses) {
      user.addresses = req.body.addresses;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      avatar: user.avatar,
      addresses: user.addresses || [],
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = store.findUserByEmail(email);

  // Return success response regardless of email existence to prevent user enumeration
  res.json({
    message: 'If an account exists with this email, a private password reset link has been dispatched.'
  });
};


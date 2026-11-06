import express from 'express';
import {
  registerUser,
  loginUser,
  getUserByToken,
  logoutUser,
  deleteAccount
} from '../services/userManager.js';

const router = express.Router();

// Helper to extract Bearer token
function getBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7).trim();
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const result = registerUser({ username, email, password });
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      user: result.user,
      token: result.token
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const result = loginUser({ email, password });
    if (result.error) {
      return res.status(401).json({ message: result.error });
    }

    return res.json({
      success: true,
      message: 'Logged in successfully.',
      user: result.user,
      token: result.token
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const user = getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Session expired or invalid.' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Auth verification error:', err);
    return res.status(500).json({ message: 'Internal server error during authentication check.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  try {
    const token = getBearerToken(req);
    if (token) {
      logoutUser(token);
    }
    return res.json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Internal server error during logout.' });
  }
});

// DELETE /api/auth/account
router.delete('/account', (req, res) => {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const user = getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Invalid session or account.' });
    }

    const result = deleteAccount(user.id, token);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.json({ success: true, message: 'Account permanently deleted.' });
  } catch (err) {
    console.error('Delete account error:', err);
    return res.status(500).json({ message: 'Internal server error during account deletion.' });
  }
});

export default router;

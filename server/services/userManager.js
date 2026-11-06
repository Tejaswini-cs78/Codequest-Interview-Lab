import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { clearUserHistory } from './questionHistoryManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    const initialData = {
      users: [],
      sessions: {}
    };
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function loadData() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data.users)) data.users = [];
    if (!data.sessions || typeof data.sessions !== 'object') data.sessions = {};
    return data;
  } catch (err) {
    console.error('Error reading users file:', err);
    return { users: [], sessions: {} };
  }
}

function saveData(data) {
  ensureStorage();
  try {
    const tempFile = `${USERS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, USERS_FILE);
  } catch (err) {
    // Fallback to direct write if rename fails
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  try {
    const [salt, key] = storedHash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function registerUser({ username, email, password }) {
  if (!username || !email || !password) {
    return { error: 'Username, email, and password are required.' };
  }

  const trimmedUsername = username.trim();
  const normalizedEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (password.length < 4) {
    return { error: 'Password must be at least 4 characters.' };
  }

  const data = loadData();

  // Check unique email
  const existingUser = data.users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    return { error: 'This email is already registered. Please log in.' };
  }

  const newUser = {
    id: crypto.randomUUID(),
    username: trimmedUsername,
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  };

  data.users.push(newUser);

  // Auto-login session creation
  const token = generateToken();
  data.sessions[token] = {
    userId: newUser.id,
    createdAt: new Date().toISOString()
  };

  saveData(data);

  return {
    success: true,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    },
    token
  };
}

export function loginUser({ email, password }) {
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const data = loadData();

  const user = data.users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  const isValid = verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return { error: 'Invalid email or password.' };
  }

  // Create active session
  const token = generateToken();
  data.sessions[token] = {
    userId: user.id,
    createdAt: new Date().toISOString()
  };

  saveData(data);

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token
  };
}

export function getUserByToken(token) {
  if (!token) return null;
  const data = loadData();
  const session = data.sessions[token];
  if (!session) return null;

  const user = data.users.find((u) => u.id === session.userId);
  if (!user) {
    // Clean up stale session
    delete data.sessions[token];
    saveData(data);
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email
  };
}

export function logoutUser(token) {
  if (!token) return false;
  const data = loadData();
  if (data.sessions[token]) {
    delete data.sessions[token];
    saveData(data);
    return true;
  }
  return false;
}

export function deleteAccount(userId, token) {
  if (!userId) return { error: 'User ID is required.' };
  const data = loadData();

  const initialCount = data.users.length;
  data.users = data.users.filter((u) => u.id !== userId);

  if (data.users.length === initialCount) {
    return { error: 'User not found.' };
  }

  // Invalidate all sessions associated with this user
  for (const [sessToken, sess] of Object.entries(data.sessions)) {
    if (sess.userId === userId || sessToken === token) {
      delete data.sessions[sessToken];
    }
  }

  saveData(data);
  clearUserHistory(userId);
  return { success: true };
}

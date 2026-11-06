import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const HISTORY_FILE = path.join(DATA_DIR, 'question_history.json');

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(HISTORY_FILE)) {
    const initial = { users: {} };
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

function loadHistory() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (!data.users || typeof data.users !== 'object') {
      data.users = {};
    }
    return data;
  } catch (err) {
    console.error('Error loading question history:', err);
    return { users: {} };
  }
}

function saveHistory(data) {
  ensureStorage();
  try {
    const tempFile = `${HISTORY_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, HISTORY_FILE);
  } catch (err) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }
}

function getUserRecord(data, userId) {
  if (!data.users[userId]) {
    data.users[userId] = {
      seenIds: [],
      attempts: {}
    };
  }
  return data.users[userId];
}

/**
 * Returns an array of question IDs seen/attempted by the user.
 * Optional filter: { mode, language, difficulty }
 */
export function getUserSeenQuestionIds(userId, filter = {}) {
  if (!userId) return [];
  const data = loadHistory();
  const userRecord = data.users[userId];
  if (!userRecord) return [];

  const seenList = userRecord.seenIds || [];
  if (!filter.mode && !filter.language && !filter.difficulty) {
    return [...seenList];
  }

  // Filter based on stored attempt metadata if available
  const matching = [];
  for (const qId of seenList) {
    const meta = userRecord.attempts[qId];
    if (!meta) {
      matching.push(qId);
      continue;
    }
    if (filter.mode && meta.mode && meta.mode.toUpperCase() !== filter.mode.toUpperCase()) {
      continue;
    }
    if (filter.language && meta.language && meta.language.toLowerCase() !== filter.language.toLowerCase()) {
      continue;
    }
    if (filter.difficulty && meta.difficulty && meta.difficulty.toLowerCase() !== filter.difficulty.toLowerCase()) {
      continue;
    }
    matching.push(qId);
  }

  return matching;
}

/**
 * Records a list of questions served to a user in a test/session.
 */
export function recordQuestionsServed(userId, questions, sessionId = null) {
  if (!userId || !Array.isArray(questions) || questions.length === 0) return;
  const data = loadHistory();
  const userRecord = getUserRecord(data, userId);

  const now = new Date().toISOString();
  let modified = false;

  for (const q of questions) {
    if (!q || !q.id) continue;
    if (!userRecord.seenIds.includes(q.id)) {
      userRecord.seenIds.push(q.id);
      modified = true;
    }

    if (!userRecord.attempts[q.id]) {
      userRecord.attempts[q.id] = {
        questionId: q.id,
        mode: q.mode || '',
        language: q.language || '',
        difficulty: q.difficulty || '',
        attempted: false,
        isCorrect: false,
        sessionId: sessionId || `test_${Date.now()}`,
        firstSeenAt: now,
        lastAttemptedAt: null
      };
      modified = true;
    }
  }

  if (modified) {
    saveHistory(data);
  }
}

/**
 * Records an execution attempt or answer submission on a question.
 */
export function recordQuestionAttempted(userId, questionId, details = {}) {
  if (!userId || !questionId) return;
  const data = loadHistory();
  const userRecord = getUserRecord(data, userId);

  if (!userRecord.seenIds.includes(questionId)) {
    userRecord.seenIds.push(questionId);
  }

  const existing = userRecord.attempts[questionId] || {
    questionId,
    mode: details.mode || '',
    language: details.language || '',
    difficulty: details.difficulty || '',
    firstSeenAt: new Date().toISOString()
  };

  existing.attempted = true;
  if (details.isCorrect !== undefined) {
    existing.isCorrect = !!details.isCorrect;
  }
  if (details.mode) existing.mode = details.mode;
  if (details.language) existing.language = details.language;
  if (details.difficulty) existing.difficulty = details.difficulty;
  existing.lastAttemptedAt = new Date().toISOString();

  userRecord.attempts[questionId] = existing;
  saveHistory(data);
}

/**
 * Permanently deletes all question history for a user (on account deletion).
 */
export function clearUserHistory(userId) {
  if (!userId) return;
  const data = loadHistory();
  if (data.users[userId]) {
    delete data.users[userId];
    saveHistory(data);
  }
}

/**
 * Returns overall practice statistics for a user.
 */
export function getUserHistoryStats(userId) {
  if (!userId) return { totalSeen: 0, totalAttempted: 0, totalCorrect: 0 };
  const data = loadHistory();
  const userRecord = data.users[userId];
  if (!userRecord) return { totalSeen: 0, totalAttempted: 0, totalCorrect: 0 };

  const attempts = Object.values(userRecord.attempts || {});
  const totalAttempted = attempts.filter((a) => a.attempted).length;
  const totalCorrect = attempts.filter((a) => a.isCorrect).length;

  return {
    totalSeen: (userRecord.seenIds || []).length,
    totalAttempted,
    totalCorrect
  };
}

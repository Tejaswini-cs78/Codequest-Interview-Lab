import express from 'express';
import {
  getQuestions as getBankQuestions,
  getNextQuestion as getBankNextQuestion,
  getQuestionById as getBankQuestionById,
  getAllQuestions
} from '../services/questionBankManager.js';
import { getUserByToken } from '../services/userManager.js';
import {
  getUserSeenQuestionIds,
  recordQuestionsServed,
  recordQuestionAttempted,
  getUserHistoryStats
} from '../services/questionHistoryManager.js';

const router = express.Router();

// Helper to extract Bearer token
function getBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7).trim();
}

// Helper to shuffle array for session randomization
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * GET /api/questions/next
 * Query params: mode, language, difficulty, category, excludeIds, sessionId
 * Returns the next unique, unattempted question for continuous practice across ALL 4 modes.
 */
router.get('/next', async (req, res) => {
  try {
    const { mode, language, difficulty, category, excludeIds, sessionId } = req.query;
    const parsedExclude = excludeIds ? excludeIds.split(',').map((id) => id.trim()).filter(Boolean) : [];

    // Authenticated user history check
    const token = getBearerToken(req);
    const user = token ? getUserByToken(token) : null;
    let allExcluded = [...parsedExclude];

    if (user) {
      const userSeen = getUserSeenQuestionIds(user.id, { mode, language, difficulty });
      allExcluded = Array.from(new Set([...userSeen, ...parsedExclude]));
    }

    const nextQ = await getBankNextQuestion({
      mode: mode ? mode.toUpperCase() : 'FIND_MISTAKE',
      language,
      difficulty,
      category,
      excludeIds: allExcluded,
    });

    if (!nextQ) {
      return res.status(404).json({ error: 'No more unique questions available for this criteria.' });
    }

    // Record that this question was served to the user
    if (user) {
      recordQuestionsServed(user.id, [nextQ], sessionId);
    }

    const { solutionCode, correctOption, ...safeQuestion } = nextQ;
    safeQuestion.sourceCode = safeQuestion.sourceCode || safeQuestion.starterCode || safeQuestion.code || '';
    safeQuestion.starterCode = safeQuestion.starterCode || safeQuestion.sourceCode || '';
    res.json({ question: safeQuestion });
  } catch (err) {
    console.error('Error fetching next question:', err);
    res.status(500).json({ error: 'Server error retrieving next question' });
  }
});

/**
 * GET /api/questions
 * Query params: mode, language, category, difficulty, shuffle, excludeIds, limit, sessionId
 * Returns a batch of unattempted questions for the test session.
 */
router.get('/', async (req, res) => {
  try {
    const { mode, language, category, difficulty, shuffle, excludeIds, limit, sessionId } = req.query;
    const parsedExclude = excludeIds ? excludeIds.split(',').map((id) => id.trim()).filter(Boolean) : [];
    const parsedLimit = limit ? parseInt(limit, 10) : 4;

    // Authenticated user history check
    const token = getBearerToken(req);
    const user = token ? getUserByToken(token) : null;
    let allExcluded = [...parsedExclude];

    if (user) {
      const userSeen = getUserSeenQuestionIds(user.id, { mode, language, difficulty });
      allExcluded = Array.from(new Set([...userSeen, ...parsedExclude]));
    }

    let resultQuestions = await getBankQuestions({
      mode: mode ? mode.toUpperCase() : 'FIND_MISTAKE',
      language,
      difficulty,
      category,
      excludeIds: allExcluded,
      limit: parsedLimit,
    });

    if (shuffle === 'true') {
      resultQuestions = shuffleArray(resultQuestions);
    }

    // Record served questions in persistent user history
    if (user && resultQuestions.length > 0) {
      recordQuestionsServed(user.id, resultQuestions, sessionId);
    }

    // Remove solution / correct answer details for security
    const sanitized = resultQuestions.map((q) => {
      const { solutionCode, correctOption, ...safeQuestion } = q;
      safeQuestion.sourceCode = safeQuestion.sourceCode || safeQuestion.starterCode || safeQuestion.code || '';
      safeQuestion.starterCode = safeQuestion.starterCode || safeQuestion.sourceCode || '';
      return safeQuestion;
    });

    res.json({
      count: sanitized.length,
      total: sanitized.length,
      questions: sanitized,
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Server error retrieving questions' });
  }
});

/**
 * POST /api/questions/attempt
 * Explicit endpoint to record question attempt status
 */
router.post('/attempt', (req, res) => {
  try {
    const token = getBearerToken(req);
    const user = token ? getUserByToken(token) : null;
    if (!user) {
      return res.json({ success: false, message: 'Unauthenticated attempt' });
    }

    const { questionId, isCorrect, mode, language, difficulty } = req.body;
    if (questionId) {
      recordQuestionAttempted(user.id, questionId, { isCorrect, mode, language, difficulty });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error recording question attempt:', err);
    res.status(500).json({ error: 'Failed to record question attempt' });
  }
});

/**
 * GET /api/questions/history
 * Returns user question history statistics
 */
router.get('/user-history', (req, res) => {
  try {
    const token = getBearerToken(req);
    const user = token ? getUserByToken(token) : null;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const stats = getUserHistoryStats(user.id);
    const seenIds = getUserSeenQuestionIds(user.id);
    res.json({ success: true, stats, seenCount: seenIds.length, seenIds });
  } catch (err) {
    console.error('Error getting history stats:', err);
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

/**
 * GET /api/questions/:id
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const question = getBankQuestionById(id);

  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  const { solutionCode, correctOption, ...safeQuestion } = question;
  safeQuestion.sourceCode = safeQuestion.sourceCode || safeQuestion.starterCode || safeQuestion.code || '';
  safeQuestion.starterCode = safeQuestion.starterCode || safeQuestion.sourceCode || '';
  res.json({ question: safeQuestion });
});

export default router;

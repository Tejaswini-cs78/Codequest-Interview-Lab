import express from 'express';
import { runCode } from '../services/codeSandbox.js';
import { runSqlQuery } from '../services/sqlSandbox.js';
import { getQuestionById } from '../services/questionBankManager.js';
import { getUserByToken } from '../services/userManager.js';
import { recordQuestionAttempted } from '../services/questionHistoryManager.js';

const router = express.Router();

function getBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7).trim();
}

/**
 * POST /api/code/run
 * Body: { questionId, language, code }
 */
router.post('/code/run', async (req, res) => {
  try {
    const { questionId, language, code } = req.body;

    if (!code || !code.trim()) {
      return res.json({
        verdict: 'EMPTY_SUBMISSION',
        error: 'Please write your code before running.',
      });
    }

    const question = getQuestionById(questionId);
    const testCases = question ? question.testCases : [];

    const result = await runCode({
      language: language || question?.language,
      code,
      testCases,
      question,
    });

    // Record user attempt if authenticated
    const token = getBearerToken(req);
    const user = token ? getUserByToken(token) : null;
    if (user && question) {
      recordQuestionAttempted(user.id, questionId, {
        isCorrect: result.verdict === 'CORRECT',
        mode: question.mode,
        language: question.language,
        difficulty: question.difficulty
      });
    }

    res.json(result);
  } catch (err) {
    console.error('Error running code:', err);
    res.status(500).json({
      verdict: 'SERVER_ERROR',
      error: 'Server error during code execution.',
    });
  }
});

/**
 * POST /api/sql/run
 * Body: { questionId, query }
 */
router.post('/sql/run', async (req, res) => {
  try {
    const { questionId, query } = req.body;

    if (!query || !query.trim()) {
      return res.json({
        verdict: 'EMPTY_SUBMISSION',
        error: 'Please write your SQL query before running.',
      });
    }

    const question = getQuestionById(questionId);
    if (!question || question.language !== 'sql') {
      return res.status(400).json({ verdict: 'INVALID_QUESTION', error: 'Invalid SQL question.' });
    }

    const result = await runSqlQuery({
      query,
      sqlTable: question.sqlTable,
      solutionQuery: question.solutionCode,
    });

    // Record user attempt if authenticated
    const token = getBearerToken(req);
    const user = token ? getUserByToken(token) : null;
    if (user) {
      recordQuestionAttempted(user.id, questionId, {
        isCorrect: result.verdict === 'CORRECT',
        mode: question.mode,
        language: question.language,
        difficulty: question.difficulty
      });
    }

    res.json(result);
  } catch (err) {
    console.error('Error running SQL:', err);
    res.status(500).json({
      verdict: 'SERVER_ERROR',
      error: 'Server error during SQL execution.',
    });
  }
});

/**
 * POST /api/answer/submit (For Mode 3 Predict Output)
 * Body: { questionId, selectedOption }
 */
router.post('/answer/submit', (req, res) => {
  const { questionId, selectedOption } = req.body;

  if (!selectedOption) {
    return res.json({
      verdict: 'EMPTY_SUBMISSION',
      error: 'Please select an option before submitting.',
    });
  }

  const question = getQuestionById(questionId);

  if (!question || question.mode !== 'PREDICT_OUTPUT') {
    return res.status(400).json({ error: 'Invalid question for output prediction.' });
  }

  const isCorrect = selectedOption === question.correctOption;

  // Record user attempt if authenticated
  const token = getBearerToken(req);
  const user = token ? getUserByToken(token) : null;
  if (user) {
    recordQuestionAttempted(user.id, questionId, {
      isCorrect,
      mode: question.mode,
      language: question.language,
      difficulty: question.difficulty
    });
  }

  res.json({
    verdict: isCorrect ? 'CORRECT' : 'WRONG_ANSWER',
    correctOption: question.correctOption,
    expectedOutput: question.expectedOutput,
    explanation: question.explanation,
    selectedOption,
  });
});

export default router;

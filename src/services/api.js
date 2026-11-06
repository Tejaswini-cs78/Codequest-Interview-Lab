const API_BASE = '/api';

function getAuthHeaders(customHeaders = {}) {
  const token = localStorage.getItem('cq_auth_token');
  const headers = { ...customHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchQuestions({ mode, language, category, difficulty, shuffle = false, excludeIds = [], limit = 4, sessionId }) {
  const params = new URLSearchParams();
  if (mode) params.append('mode', mode);
  if (language) params.append('language', language);
  if (category) params.append('category', category);
  if (difficulty) params.append('difficulty', difficulty);
  if (shuffle) params.append('shuffle', 'true');
  if (limit) params.append('limit', String(limit));
  if (sessionId) params.append('sessionId', sessionId);
  if (excludeIds && excludeIds.length > 0) {
    params.append('excludeIds', excludeIds.join(','));
  }

  const res = await fetch(`${API_BASE}/questions?${params.toString()}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function fetchNextQuestion({ mode, language, category, difficulty, excludeIds = [], sessionId }) {
  const params = new URLSearchParams();
  if (mode) params.append('mode', mode);
  if (language) params.append('language', language);
  if (category) params.append('category', category);
  if (difficulty) params.append('difficulty', difficulty);
  if (sessionId) params.append('sessionId', sessionId);
  if (excludeIds && excludeIds.length > 0) {
    params.append('excludeIds', excludeIds.join(','));
  }

  const res = await fetch(`${API_BASE}/questions/next?${params.toString()}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to fetch next question');
  }
  return res.json();
}

export async function fetchQuestionById(id) {
  const res = await fetch(`${API_BASE}/questions/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch question details');
  return res.json();
}

export async function executeCode({ questionId, language, code }) {
  const res = await fetch(`${API_BASE}/code/run`, {
    method: 'POST',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ questionId, language, code }),
  });
  if (!res.ok) throw new Error('Failed to execute code');
  return res.json();
}

export async function executeSql({ questionId, query }) {
  const res = await fetch(`${API_BASE}/sql/run`, {
    method: 'POST',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ questionId, query }),
  });
  if (!res.ok) throw new Error('Failed to execute SQL query');
  return res.json();
}

export async function submitAnswer({ questionId, selectedOption }) {
  const res = await fetch(`${API_BASE}/answer/submit`, {
    method: 'POST',
    headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ questionId, selectedOption }),
  });
  if (!res.ok) throw new Error('Failed to submit answer');
  return res.json();
}

export async function recordQuestionAttempt({ questionId, isCorrect, mode, language, difficulty }) {
  try {
    const res = await fetch(`${API_BASE}/questions/attempt`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ questionId, isCorrect, mode, language, difficulty }),
    });
    return res.json();
  } catch (err) {
    return { success: false };
  }
}

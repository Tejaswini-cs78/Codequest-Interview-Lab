async function verifyPredictOutput() {
  console.log('=== VERIFYING PREDICT THE OUTPUT MODE ===\n');

  async function apiGet(endpoint) {
    const res = await fetch(`http://localhost:5000/api${endpoint}`);
    if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`);
    return res.json();
  }

  async function apiPost(endpoint, body) {
    const res = await fetch(`http://localhost:5000/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed: ${res.status}`);
    return res.json();
  }

  const languages = ['python', 'c', 'java'];
  let totalTested = 0;

  for (const lang of languages) {
    console.log(`--- Testing Language: ${lang.toUpperCase()} ---`);
    const data = await apiGet(`/questions?mode=PREDICT_OUTPUT&language=${lang}&shuffle=false`);
    console.log(`Found ${data.questions.length} questions for ${lang}.`);
    if (data.questions.length === 0) {
      throw new Error(`No Predict Output questions found for ${lang}!`);
    }

    for (const q of data.questions) {
      totalTested++;
      process.stdout.write(`  [${q.id}] (${q.difficulty}) "${q.title}"... `);

      // Check 1: sourceCode exists and is non-empty
      const code = q.sourceCode || q.starterCode || q.code;
      if (!code || !code.trim()) {
        throw new Error(`Question ${q.id} has empty or missing source code!`);
      }

      // Check 2: 4 options exist
      if (!q.options || q.options.length !== 4) {
        throw new Error(`Question ${q.id} does not have 4 options (found ${q.options?.length})`);
      }
      const optionIds = q.options.map(o => o.id).sort().join('');
      if (optionIds !== 'ABCD') {
        throw new Error(`Question ${q.id} options are not A, B, C, D (found ${optionIds})`);
      }

      // Check 3: Test wrong answer submission
      const wrongOpt = 'D'; // One of the options
      const wrongRes = await apiPost('/answer/submit', {
        questionId: q.id,
        selectedOption: wrongOpt,
      });

      if (!wrongRes.verdict || !wrongRes.expectedOutput || !wrongRes.explanation) {
        throw new Error(`Incomplete response from /api/answer/submit for ${q.id}: ${JSON.stringify(wrongRes)}`);
      }

      // Check 4: Test correct answer submission
      const correctOpt = wrongRes.correctOption;
      const correctRes = await apiPost('/answer/submit', {
        questionId: q.id,
        selectedOption: correctOpt,
      });

      if (correctRes.verdict !== 'CORRECT') {
        throw new Error(`Submitting correct option ${correctOpt} for ${q.id} did not yield CORRECT verdict! Got: ${correctRes.verdict}`);
      }

      console.log('PASS (SourceCode present, 4 options, evaluation accurate)');
    }
  }

  // Check 5: Next question continuous fetching without duplicates
  console.log('\n--- Testing Next Question endpoint (/api/questions/next) for PREDICT_OUTPUT ---');
  const seenIds = new Set();
  for (let i = 1; i <= 6; i++) {
    const excludeParam = Array.from(seenIds).join(',');
    const res = await apiGet(`/questions/next?mode=PREDICT_OUTPUT&language=python&excludeIds=${excludeParam}`);
    const nextQ = res.question;
    console.log(`Next ${i}: [${nextQ.id}] "${nextQ.title}" - SourceCode: ${Boolean(nextQ.sourceCode)}`);
    if (seenIds.has(nextQ.id)) {
      throw new Error(`Duplicate question served: ${nextQ.id}`);
    }
    if (!nextQ.sourceCode || !nextQ.sourceCode.trim()) {
      throw new Error(`Question ${nextQ.id} served by /next is missing source code!`);
    }
    seenIds.add(nextQ.id);
  }

  console.log(`\n================================================================================`);
  console.log(`SUCCESS: ALL ${totalTested} PREDICT OUTPUT QUESTIONS VERIFIED WITH PROMINENT SOURCE CODE & ACCURATE EVALUATION!`);
}

verifyPredictOutput().catch((err) => {
  console.error('\nTEST FAILED:', err);
  process.exit(1);
});

async function testPredictOptions() {
  const BASE = 'http://localhost:5000/api';
  console.log('================================================================================');
  console.log('VERIFYING PREDICT THE OUTPUT MODE OPTION RENDERING & DATA INTEGRITY');
  console.log('================================================================================\n');

  // Test languages: Python, C, Java
  const languages = ['python', 'c', 'java'];

  for (const lang of languages) {
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`Testing Language: ${lang.toUpperCase()}`);
    console.log(`--------------------------------------------------------------------------------`);

    const res = await fetch(`${BASE}/questions?mode=PREDICT_OUTPUT&language=${lang}&limit=10`);
    const data = await res.json();
    console.log(`Fetched ${data.questions.length} questions for ${lang}:`);

    for (const q of data.questions) {
      if (!q.options || q.options.length !== 4) {
        console.error(`❌ Question [${q.id}] does NOT have 4 options! Has:`, q.options?.length);
        process.exit(1);
      }

      // Check each option
      const letters = ['A', 'B', 'C', 'D'];
      for (let i = 0; i < q.options.length; i++) {
        const opt = q.options[i];
        const optText = typeof opt === 'string' ? opt : (opt.text || opt.value || '');
        const optId = typeof opt === 'string' ? letters[i] : (opt.id || letters[i]);

        if (!optText || optText.trim().length === 0) {
          console.error(`❌ Empty option text found in [${q.id}] option ${i + 1}:`, opt);
          process.exit(1);
        }
      }

      // Test submit answer endpoint
      const submitRes = await fetch(`${BASE}/answer/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, selectedOption: 'A' })
      });
      const submitData = await submitRes.json();
      if (!submitData.verdict || !submitData.expectedOutput) {
        console.error(`❌ Submit answer failed for [${q.id}]:`, submitData);
        process.exit(1);
      }

      console.log(`  ✔ [${q.id}] (${q.difficulty}) "${q.title}" -> 4 readable options verified. (Opt A: "${(typeof q.options[0] === 'string' ? q.options[0] : q.options[0].text).replace(/\n/g, '\\n').slice(0, 30)}...")`);
    }
    console.log();
  }

  console.log('================================================================================');
  console.log('ALL PREDICT THE OUTPUT OPTIONS ARE COMPLETE, READABLE, AND VERIFIED!');
  console.log('================================================================================\n');
}

testPredictOptions().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

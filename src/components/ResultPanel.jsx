import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Terminal, Database, HelpCircle, Check, X } from 'lucide-react';

const VERDICT_CONFIGS = {
  CORRECT: {
    label: 'Correct!',
    icon: CheckCircle,
    color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    badge: 'bg-emerald-500 text-slate-950',
  },
  WRONG_ANSWER: {
    label: 'Wrong Answer',
    icon: XCircle,
    color: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    badge: 'bg-rose-500 text-white',
  },
  COMPILATION_ERROR: {
    label: 'Compilation Error',
    icon: AlertTriangle,
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    badge: 'bg-amber-500 text-slate-950',
  },
  RUNTIME_ERROR: {
    label: 'Runtime Error',
    icon: XCircle,
    color: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    badge: 'bg-rose-500 text-white',
  },
  SYNTAX_ERROR: {
    label: 'Syntax Error',
    icon: AlertTriangle,
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    badge: 'bg-amber-500 text-slate-950',
  },
  SQL_ERROR: {
    label: 'SQL Error',
    icon: AlertTriangle,
    color: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    badge: 'bg-rose-500 text-white',
  },
  TIMEOUT: {
    label: 'Time Limit Exceeded',
    icon: AlertTriangle,
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    badge: 'bg-amber-500 text-slate-950',
  },
  EMPTY_SUBMISSION: {
    label: 'Empty Submission',
    icon: AlertTriangle,
    color: 'bg-slate-800 border-slate-700 text-slate-300',
    badge: 'bg-slate-700 text-slate-200',
  },
};

export default function ResultPanel({ result, isRunning, isSql = false, modeKey = '' }) {
  const [activeTab, setActiveTab] = useState('testcases');

  if (isRunning) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[180px] space-y-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-300 animate-pulse">
          Running & Evaluating Code...
        </p>
      </div>
    );
  }

  if (!result) {
    if (modeKey === 'PREDICT_OUTPUT') {
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[240px] text-center space-y-3">
          <HelpCircle className="w-12 h-12 text-purple-400/80 mb-1" />
          <h4 className="text-base font-bold text-white">Predicted Output Analysis</h4>
          <p className="text-sm font-medium text-slate-300 max-w-md">
            Analyze the code and select your predicted output.
          </p>
          <p className="text-xs text-slate-500 max-w-sm">
            Read the program on the left, review the logic, and choose option A, B, C, or D before submitting.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[180px] text-slate-500 text-sm">
        <Terminal className="w-8 h-8 mb-2 opacity-50" />
        <p>Output will appear here after running your solution.</p>
      </div>
    );
  }

  // Predict the Output Result View
  if (modeKey === 'PREDICT_OUTPUT' || result.correctOption !== undefined) {
    const isCorrect = result.verdict === 'CORRECT';

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
        {/* Verdict Banner */}
        <div className={`p-4 border-b flex items-center justify-between ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" />
            ) : (
              <XCircle className="w-6 h-6 shrink-0 text-rose-400" />
            )}
            <div>
              <h4 className="font-extrabold text-base tracking-tight">
                {isCorrect ? 'CORRECT!' : 'WRONG ANSWER.'}
              </h4>
              <p className="text-xs opacity-90 mt-0.5">
                {isCorrect
                  ? 'Your prediction matched the program output.'
                  : 'Your prediction was incorrect. Review the correct output below.'}
              </p>
            </div>
          </div>
        </div>

        {/* Prediction Details Breakdown */}
        <div className="p-5 space-y-4 text-xs">
          {result.selectedOption && (
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Your Prediction:</span>
              <span className={`font-mono font-bold px-2.5 py-1 rounded-lg ${isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                Option {result.selectedOption}
              </span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block">Correct Output:</span>
            <pre className="font-mono text-sm text-emerald-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap">
              {result.expectedOutput}
            </pre>
          </div>

          {result.explanation && (
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/30 space-y-1.5">
              <span className="text-purple-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                <span>Explanation & Flow:</span>
              </span>
              <p className="font-sans text-slate-300 leading-relaxed text-xs">
                {result.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const verdictConfig = VERDICT_CONFIGS[result.verdict] || VERDICT_CONFIGS.WRONG_ANSWER;
  const VerdictIcon = verdictConfig.icon;

  const passedCount = result.testCaseResults 
    ? result.testCaseResults.filter((tc) => tc.passed).length 
    : (result.passedCount !== undefined ? result.passedCount : 0);
  const totalCount = result.testCaseResults 
    ? result.testCaseResults.length 
    : (result.totalCount !== undefined ? result.totalCount : 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Header Verdict Banner */}
      <div className={`p-4 border-b flex items-center justify-between ${verdictConfig.color}`}>
        <div className="flex items-center gap-3">
          <VerdictIcon className="w-6 h-6 shrink-0" />
          <div>
            <h4 className="font-extrabold text-base tracking-tight">
              {result.verdict === 'CORRECT' && totalCount > 0
                ? `CORRECT — ${passedCount}/${totalCount} Test Cases Passed.`
                : result.verdict === 'WRONG_ANSWER' && totalCount > 0
                ? `WRONG ANSWER — ${passedCount}/${totalCount} Test Cases Passed.`
                : verdictConfig.label}
            </h4>
            {result.error && (
              <p className="text-xs opacity-90 mt-0.5 font-mono line-clamp-2">{result.error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950 px-4 text-xs font-semibold">
        {result.testCaseResults && result.testCaseResults.length > 0 && (
          <button
            onClick={() => setActiveTab('testcases')}
            className={`py-2.5 px-4 border-b-2 transition-colors ${
              activeTab === 'testcases'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Test Cases ({passedCount}/{totalCount})
          </button>
        )}
        {(result.output !== undefined || result.error) && (
          <button
            onClick={() => setActiveTab('output')}
            className={`py-2.5 px-4 border-b-2 transition-colors ${
              activeTab === 'output'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Output & Logs
          </button>
        )}
        {isSql && result.userResult && (
          <button
            onClick={() => setActiveTab('sql')}
            className={`py-2.5 px-4 border-b-2 transition-colors ${
              activeTab === 'sql'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SQL Result Table
          </button>
        )}
      </div>

      {/* Tab Contents */}
      <div className="p-4 overflow-y-auto max-h-[300px] text-xs font-mono">
        {/* Test Cases View */}
        {activeTab === 'testcases' && result.testCaseResults && (
          <div className="space-y-3">
            {result.testCaseResults.map((tc, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  tc.passed
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/5 border-rose-500/20 text-rose-300'
                }`}
              >
                <div className="flex items-center justify-between font-sans font-semibold mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    {tc.passed ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <X className="w-4 h-4 text-rose-400" />
                    )}
                    Test Case {idx + 1} — {tc.passed ? 'PASS' : 'FAIL'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                      tc.passed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {tc.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>

                {tc.input && (
                  <div className="mt-1">
                    <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">Input:</span>
                    <pre className="bg-slate-950 p-1.5 rounded mt-0.5 text-slate-300 overflow-x-auto">
                      {tc.input}
                    </pre>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">Expected:</span>
                    <pre className="bg-slate-950 p-1.5 rounded mt-0.5 text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                      {tc.expectedOutput}
                    </pre>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">Actual:</span>
                    <pre className={`bg-slate-950 p-1.5 rounded mt-0.5 overflow-x-auto whitespace-pre-wrap ${
                      tc.passed ? 'text-slate-200' : 'text-rose-300 font-semibold'
                    }`}>
                      {tc.actualOutput !== undefined && tc.actualOutput !== '' ? tc.actualOutput : (tc.error ? `Error: ${tc.error}` : '(empty)')}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Output & Error View */}
        {activeTab === 'output' && (
          <div className="space-y-2">
            {result.output && (
              <div>
                <span className="text-slate-400 font-sans text-xs block mb-1">Standard Output (stdout):</span>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200 whitespace-pre-wrap">
                  {result.output}
                </pre>
              </div>
            )}
            {result.error && (
              <div>
                <span className="text-rose-400 font-sans text-xs block mb-1">Error Trace (stderr):</span>
                <pre className="bg-slate-950 p-3 rounded-xl border border-rose-900/40 text-rose-300 whitespace-pre-wrap">
                  {result.error}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* SQL Table View */}
        {isSql && result.userResult && (
          <div className="space-y-3 font-sans">
            <h5 className="text-xs font-semibold text-slate-300">Query Output Table:</h5>
            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase">
                  <tr>
                    {result.userResult.columns.map((col, i) => (
                      <th key={i} className="px-3 py-2 border-r border-slate-800 last:border-0 font-mono">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {result.userResult.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-800/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-2 border-r border-slate-800 last:border-0 font-mono">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {result.userResult.rows.length === 0 && (
                    <tr>
                      <td colSpan={result.userResult.columns.length || 1} className="px-3 py-4 text-center text-slate-500">
                        (0 rows returned)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

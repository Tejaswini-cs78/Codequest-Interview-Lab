import React from 'react';
import { HelpCircle, Database, CheckCircle2, AlertCircle, FileText, Sparkles, Code2 } from 'lucide-react';

export default function QuestionPanel({
  question,
  currentIndex,
  totalQuestions,
  modeKey,
  selectedOption,
  onSelectOption,
  onSubmitAnswer,
  isSubmitted,
  result,
}) {
  if (!question) return null;

  const isPredictMode = modeKey === 'PREDICT_OUTPUT';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full overflow-y-auto space-y-6">
      {/* Header Badges & Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {question.category}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              question.difficulty === 'Easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : question.difficulty === 'Medium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            {question.difficulty}
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {question.title}
        </h2>
      </div>

      {/* Instructions / Prompt */}
      <div className="prose prose-invert max-w-none space-y-3 text-slate-300 text-sm leading-relaxed">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200">
          <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-1">Instructions:</p>
          <p className="font-medium">{question.question}</p>
        </div>

        {question.description && (
          <div className="whitespace-pre-wrap text-slate-300 font-sans leading-relaxed">
            {question.description}
          </div>
        )}
      </div>

      {/* Test Cases Section on the Left Side */}
      {question.testCases && question.testCases.length > 0 && !isPredictMode && (
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Test Cases
            </h3>
          </div>

          <div className="space-y-3">
            {question.testCases.map((tc, idx) => (
              <div
                key={tc.id || idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-blue-400 font-mono font-bold">
                    Test Case {idx + 1}
                  </span>
                </div>

                {tc.input !== undefined && tc.input !== null && tc.input !== '' && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Input:
                    </span>
                    <pre className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                      {tc.input}
                    </pre>
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Expected Output:
                  </span>
                  <pre className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {tc.expectedOutput}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: Display Complete Source Code Prominently on Left Side */}
      {isPredictMode && (
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-purple-400">
              <Code2 className="w-4 h-4" />
              <span>Program Source Code ({question.language})</span>
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              Analyze Code
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-inner overflow-hidden">
            <pre className="font-mono text-xs md:text-sm text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre selection:bg-purple-900 selection:text-white">
              <code>{question.sourceCode || question.code || question.starterCode || '// No code provided'}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Mode 3: Predict Output Options */}
      {isPredictMode && question.options && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Select the Correct Output:</span>
          </h3>

          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isCorrectOpt = result && result.correctOption === opt.id;
              const isWrongSelection = isSubmitted && isSelected && !isCorrectOpt;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isSubmitted) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isWrongSelection) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-purple-600/30 border-purple-500 text-white font-bold ring-2 ring-purple-500/40';
              }

              return (
                <button
                  key={opt.id}
                  disabled={isSubmitted}
                  onClick={() => onSelectOption(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm font-mono flex items-center justify-between transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs">
                      {opt.id}
                    </span>
                    <span className="whitespace-pre-wrap">{opt.text}</span>
                  </div>

                  {isSubmitted && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && isWrongSelection && (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!isSubmitted ? (
            <button
              onClick={onSubmitAnswer}
              disabled={!selectedOption}
              className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-purple-600/20 transition-all"
            >
              Submit Answer
            </button>
          ) : (
            result && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Explanation:</span>
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">{result.explanation}</p>
                <div className="pt-2 text-emerald-400 font-mono font-semibold">
                  Correct Output: {result.expectedOutput}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

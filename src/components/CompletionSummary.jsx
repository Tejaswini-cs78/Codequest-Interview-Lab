import React from 'react';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle, Target, Award } from 'lucide-react';

export default function CompletionSummary({ stats, onPracticeAgain, onGoHome }) {
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Top Glow & Trophy Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/30">
          <Trophy className="w-10 h-10 text-white" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Session Finished
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
            Practice Complete!
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Great job! Here is a breakdown of your performance in this session.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-xs text-slate-500 block font-medium">Total Questions</span>
            <span className="text-2xl font-black text-white mt-1 block">{stats.total}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-xs text-slate-500 block font-medium">Accuracy</span>
            <span className="text-2xl font-black text-blue-400 mt-1 block">{accuracy}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
            <span className="text-xs text-emerald-400 block font-medium flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Correct
            </span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">{stats.correct}</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-center">
            <span className="text-xs text-rose-400 block font-medium flex items-center justify-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Wrong
            </span>
            <span className="text-2xl font-black text-rose-400 mt-1 block">{stats.wrong}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPracticeAgain}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Again</span>
          </button>

          <button
            onClick={onGoHome}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}

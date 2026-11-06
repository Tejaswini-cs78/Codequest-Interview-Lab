import React, { useState } from 'react';
import { X, Play, Code2, Layers, BarChart } from 'lucide-react';

const MODE_TITLES = {
  FIND_MISTAKE: 'Find the Mistake & Run',
  WRITE_FROM_SCRATCH: 'Write Code From Scratch',
  PREDICT_OUTPUT: 'Predict the Output',
  FILL_MISSING_CODE: 'Fill the Missing Code',
};

const MODE_LANGUAGES = {
  FIND_MISTAKE: ['python', 'c', 'java'],
  WRITE_FROM_SCRATCH: ['python', 'c', 'java', 'sql'],
  PREDICT_OUTPUT: ['python', 'c', 'java'],
  FILL_MISSING_CODE: ['python', 'c', 'java'],
};

export default function ModeSetupModal({ modeKey, onClose, onStartSession }) {
  const supportedLangs = MODE_LANGUAGES[modeKey] || ['python', 'c', 'java'];
  const [selectedLang, setSelectedLang] = useState(supportedLangs[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleStart = () => {
    onStartSession({
      mode: modeKey,
      language: selectedLang,
      difficulty: selectedDifficulty,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            Practice Session Setup
          </span>
          <h2 className="text-xl font-extrabold text-white mt-2">
            {MODE_TITLES[modeKey]}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose your preferred language and options to begin.
          </p>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>Select Language</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {supportedLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`py-2.5 px-3 rounded-xl border text-sm font-semibold capitalize flex items-center justify-between transition-all ${
                  selectedLang === lang
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <span>{lang === 'sql' ? 'SQL' : lang}</span>
                {selectedLang === lang && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart className="w-4 h-4 text-indigo-400" />
            <span>Difficulty Level (Optional)</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff || 'All Levels'}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleStart}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Practice Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Bug, FileCode, Eye, Puzzle, ArrowRight } from 'lucide-react';

const MODE_CONFIGS = {
  FIND_MISTAKE: {
    title: 'Find the Mistake',
    subtitle: 'Find and fix the mistake in the given code.',
    languages: ['Python', 'C', 'Java'],
    icon: Bug,
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    badge: 'Debugging & Execution',
  },
  WRITE_FROM_SCRATCH: {
    title: 'Write From Scratch',
    subtitle: 'Read the interview question and write the complete solution.',
    languages: ['Python', 'C', 'Java', 'SQL'],
    icon: FileCode,
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    badge: 'Algorithms & Queries',
  },
  PREDICT_OUTPUT: {
    title: 'Predict the Output',
    subtitle: 'Analyze the code and select the correct output.',
    languages: ['Python', 'C', 'Java'],
    icon: Eye,
    color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    badge: 'Code Tracing & Logic',
  },
  FILL_MISSING_CODE: {
    title: 'Fill the Missing Code',
    subtitle: 'Complete the missing parts of the given code.',
    languages: ['Python', 'C', 'Java'],
    icon: Puzzle,
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    badge: 'Syntax & Snippets',
  },
};

export default function ModeCard({ modeKey, onSelect }) {
  const config = MODE_CONFIGS[modeKey];
  if (!config) return null;

  const IconComponent = config.icon;

  return (
    <div className={`group relative rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-500/5`}>
      <div className="space-y-4">
        {/* Header Badge & Icon */}
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center border shadow-inner`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
            {config.badge}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {config.title}
          </h3>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            "{config.subtitle}"
          </p>
        </div>

        {/* Languages Tags */}
        <div className="pt-2">
          <span className="text-xs text-slate-500 block mb-2 font-medium uppercase tracking-wider">
            Supported Languages:
          </span>
          <div className="flex flex-wrap gap-2">
            {config.languages.map((lang) => (
              <span
                key={lang}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Start Practice Button */}
      <div className="mt-8 pt-4 border-t border-slate-800/80">
        <button
          onClick={() => onSelect(modeKey)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 group-hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
        >
          <span>Start Practice</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

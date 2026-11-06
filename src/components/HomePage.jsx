import React, { useState } from 'react';
import ModeCard from './ModeCard';
import ModeSetupModal from './ModeSetupModal';
import { Terminal, Code, Cpu, Database, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage({ onStartSession }) {
  const [selectedModeKey, setSelectedModeKey] = useState(null);

  const modes = [
    'FIND_MISTAKE',
    'WRITE_FROM_SCRATCH',
    'PREDICT_OUTPUT',
    'FILL_MISSING_CODE',
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Technical Interview Practice Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            CodeQuest <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Interview Lab</span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-slate-300 max-w-2xl mx-auto">
            Practice. Debug. Think. Crack Interviews.
          </p>

          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Sharpen your programming and problem-solving skills across 4 dedicated practice modes with real code execution and test evaluation.
          </p>

          {/* Quick Feature Badges */}
          <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Real Code Sandbox</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Test Case Evaluation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SQL Database Sandbox</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>4 Distinct Practice Modes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modes Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Select Practice Mode</h2>
            <p className="text-sm text-slate-400">Choose one of the 4 independent coding practice tracks.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map((modeKey) => (
            <ModeCard
              key={modeKey}
              modeKey={modeKey}
              onSelect={(key) => setSelectedModeKey(key)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} CodeQuest Interview Lab — All Rights Reserved.</p>
        </div>
      </footer>

      {/* Setup Modal */}
      {selectedModeKey && (
        <ModeSetupModal
          modeKey={selectedModeKey}
          onClose={() => setSelectedModeKey(null)}
          onStartSession={(config) => {
            setSelectedModeKey(null);
            onStartSession(config);
          }}
        />
      )}
    </div>
  );
}

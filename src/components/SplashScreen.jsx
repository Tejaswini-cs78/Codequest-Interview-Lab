import React, { useEffect, useState } from 'react';
import { Terminal, Code2, Sparkles } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // Exactly 2 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        onFinish();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 select-none overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
        {/* Animated Brand Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-2xl shadow-blue-500/30 animate-bounce duration-1000">
            <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center backdrop-blur">
              <Terminal className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Project Name */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            CodeQuest
          </h1>
          <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/30 tracking-wide uppercase">
            Interview Lab
          </span>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-slate-300 font-medium tracking-wide mb-8">
          Practice. Debug. Think. Crack Interviews.
        </p>

        {/* Loading Bar (fills across 2 seconds) */}
        <div className="w-56 sm:w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
          <span>Initializing workspace... {progress}%</span>
        </div>
      </div>
    </div>
  );
}

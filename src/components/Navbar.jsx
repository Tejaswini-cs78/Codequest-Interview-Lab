import React from 'react';
import { Terminal, Home, LogOut, Trash2, User } from 'lucide-react';

export default function Navbar({
  activeMode,
  activeLang,
  sessionStats,
  currentView,
  onGoHome,
  user,
  onOpenLogoutModal,
  onOpenDeleteModal
}) {
  const isSession = currentView === 'session';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CodeQuest
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                Interview Lab
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden lg:block">
              Practice. Debug. Think. Crack Interviews.
            </p>
          </div>
        </div>

        {/* Practice Session Metadata & Stats */}
        {isSession && (
          <div className="hidden sm:flex items-center gap-3 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-medium">
            {activeMode && (
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 uppercase tracking-wider text-[10px]">
                {activeMode.replace(/_/g, ' ')}
              </span>
            )}
            {activeLang && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 uppercase tracking-wider text-[10px]">
                {activeLang}
              </span>
            )}
            <div className="h-4 w-px bg-slate-800 mx-1 hidden md:block" />
            <div className="hidden md:flex items-center gap-3 text-slate-300">
              <span>Attempted: <strong className="text-white">{sessionStats.attempted}</strong></span>
              <span>Correct: <strong className="text-emerald-400">{sessionStats.correct}</strong></span>
              <span>Wrong: <strong className="text-rose-400">{sessionStats.wrong}</strong></span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 font-bold">
                {sessionStats.accuracy}% Accuracy
              </span>
            </div>
          </div>
        )}

        {/* Action Controls & User Account Info */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Exit Practice (when inside a session) */}
          {isSession && (
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit Practice</span>
            </button>
          )}

          {/* User Account Controls */}
          {user && (
            <div className="flex items-center gap-2">
              {/* Logged in as: student@gmail.com */}
              <div className="flex items-center gap-2 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-slate-400 font-normal hidden sm:inline">Logged in as:</span>
                <span className="font-semibold text-white max-w-[140px] sm:max-w-[220px] truncate" title={user.email}>
                  {user.email}
                </span>
              </div>

              {/* Delete Account button */}
              <button
                onClick={onOpenDeleteModal}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-semibold border border-rose-500/20 transition-colors"
                title="Permanently delete account"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Delete Account</span>
              </button>

              {/* Logout button */}
              <button
                onClick={onOpenLogoutModal}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                title="Log out of CodeQuest Interview Lab"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Code2, Copy, Check, RotateCcw } from 'lucide-react';

const MONACO_LANG_MAP = {
  python: 'python',
  c: 'cpp',
  java: 'java',
  sql: 'sql',
};

export default function CodeEditor({
  language,
  value,
  onChange,
  onReset,
  disabled = false,
  missingCodePlaceholder = null,
}) {
  const [copied, setCopied] = useState(false);
  const monacoLanguage = MONACO_LANG_MAP[language?.toLowerCase()] || 'plaintext';

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span className="font-mono uppercase text-slate-200 font-semibold tracking-wider">
            {language === 'sql' ? 'SQL Query Editor' : `${language} Editor`}
          </span>
          {missingCodePlaceholder && (
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-medium">
              Fill placeholder: <code className="font-bold">{missingCodePlaceholder}</code>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              disabled={disabled}
              title="Reset Code to Original"
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copy Code"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 min-h-[300px] relative">
        <Editor
          height="100%"
          language={monacoLanguage}
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            tabSize: 4,
            readOnly: disabled,
            padding: { top: 12, bottom: 12 },
          }}
          loading={
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400 text-sm">
              Loading Editor...
            </div>
          }
        />
      </div>
    </div>
  );
}

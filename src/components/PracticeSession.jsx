import React, { useState, useEffect } from 'react';
import QuestionPanel from './QuestionPanel';
import CodeEditor from './CodeEditor';
import ResultPanel from './ResultPanel';
import CompletionSummary from './CompletionSummary';
import UnsavedWarningModal from './UnsavedWarningModal';
import { fetchQuestions, fetchNextQuestion, executeCode, executeSql, submitAnswer } from '../services/api';
import { Play, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

export default function PracticeSession({ sessionConfig, onUpdateStats, onGoHome }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editor and Submission state
  const [userCode, setUserCode] = useState('');
  const [initialCode, setInitialCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Navigation warning & Continuous practice
  const [pendingNavIndex, setPendingNavIndex] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  // Session completion
  const [isCompleted, setIsCompleted] = useState(false);
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState(new Set());
  const [correctQuestionIds, setCorrectQuestionIds] = useState(new Set());

  // Load session questions
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const testSessionId = `test_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const data = await fetchQuestions({
          mode: sessionConfig.mode,
          language: sessionConfig.language,
          difficulty: sessionConfig.difficulty,
          limit: 4,
          sessionId: testSessionId,
        });

        if (!data.questions || data.questions.length === 0) {
          setError('No questions found for the selected mode and language.');
        } else {
          setQuestions(data.questions);
          setCurrentIndex(0);
          setupQuestion(data.questions[0]);
        }
      } catch (err) {
        setError('Failed to load questions from server.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [sessionConfig]);

  // Setup current question state
  const setupQuestion = (q) => {
    if (!q) return;
    const isSqlScratch =
      (sessionConfig.mode === 'WRITE_FROM_SCRATCH' || q.mode === 'WRITE_FROM_SCRATCH') &&
      (sessionConfig.language === 'sql' || q.language === 'sql');
    const startCode = isSqlScratch ? '' : (q.starterCode || '');
    setUserCode(startCode);
    setInitialCode(startCode);
    setSelectedOption('');
    setResult(null);
    setIsSubmitted(false);
  };

  const currentQuestion = questions[currentIndex];

  // Update session statistics parent
  const updateStats = (newAttempted, newCorrect) => {
    setAttemptedQuestionIds(newAttempted);
    setCorrectQuestionIds(newCorrect);
    const attemptedCount = newAttempted.size;
    const correctCount = newCorrect.size;
    const wrongCount = attemptedCount - correctCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    onUpdateStats({
      attempted: attemptedCount,
      correct: correctCount,
      wrong: wrongCount,
      accuracy,
      total: questions.length,
    });
  };

  // Handle Reset code and execution result
  const handleReset = () => {
    const isSqlScratch =
      (sessionConfig.mode === 'WRITE_FROM_SCRATCH' || currentQuestion?.mode === 'WRITE_FROM_SCRATCH') &&
      (sessionConfig.language === 'sql' || currentQuestion?.language === 'sql');
    setUserCode(isSqlScratch ? '' : initialCode);
    setResult(null);
    setIsSubmitted(false);
  };

  // Run Code / Query handler
  const handleRunCode = async () => {
    if (!currentQuestion) return;

    // Check empty submission
    if (!userCode || !userCode.trim()) {
      setResult({
        verdict: 'EMPTY_SUBMISSION',
        error:
          sessionConfig.language === 'sql' || currentQuestion.language === 'sql'
            ? 'Please write your SQL query before running.'
            : 'Please write your code before running.',
      });
      return;
    }

    // Check Mode 4 placeholder completion
    if (
      sessionConfig.mode === 'FILL_MISSING_CODE' &&
      currentQuestion.missingCodePlaceholder &&
      userCode.includes(currentQuestion.missingCodePlaceholder)
    ) {
      setResult({
        verdict: 'EMPTY_SUBMISSION',
        error: `Please replace the '${currentQuestion.missingCodePlaceholder}' placeholder with your code before running.`,
      });
      return;
    }

    try {
      setIsRunning(true);
      setResult(null);

      let res;
      if (sessionConfig.language === 'sql' || currentQuestion.language === 'sql') {
        res = await executeSql({
          questionId: currentQuestion.id,
          query: userCode,
        });
      } else {
        res = await executeCode({
          questionId: currentQuestion.id,
          language: currentQuestion.language,
          code: userCode,
        });
      }

      setResult(res);
      setIsSubmitted(true);

      // Track stats
      const nextAttempted = new Set(attemptedQuestionIds).add(currentQuestion.id);
      const nextCorrect = new Set(correctQuestionIds);

      if (res.verdict === 'CORRECT') {
        nextCorrect.add(currentQuestion.id);
      } else {
        nextCorrect.delete(currentQuestion.id);
      }

      updateStats(nextAttempted, nextCorrect);
    } catch (err) {
      setResult({
        verdict: 'RUNTIME_ERROR',
        error: 'Execution request failed. Please try again.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Mode 3 Submit Option handler
  const handleSubmitOption = async () => {
    if (!currentQuestion || !selectedOption) return;

    try {
      setIsRunning(true);
      const res = await submitAnswer({
        questionId: currentQuestion.id,
        selectedOption,
      });

      setResult(res);
      setIsSubmitted(true);

      const nextAttempted = new Set(attemptedQuestionIds).add(currentQuestion.id);
      const nextCorrect = new Set(correctQuestionIds);

      if (res.verdict === 'CORRECT') {
        nextCorrect.add(currentQuestion.id);
      } else {
        nextCorrect.delete(currentQuestion.id);
      }

      updateStats(nextAttempted, nextCorrect);
    } catch (err) {
      setResult({
        verdict: 'RUNTIME_ERROR',
        error: 'Failed to submit answer.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Question Navigation with unsaved changes check
  const navigateTo = (newIndex) => {
    if (newIndex < 0 || newIndex >= questions.length) return;

    // Check if code was modified and not yet submitted
    const isDirty = userCode !== initialCode && !isSubmitted;
    if (isDirty) {
      setPendingNavIndex(newIndex);
      setShowWarning(true);
    } else {
      performNavigation(newIndex);
    }
  };

  const performNavigation = (index) => {
    setCurrentIndex(index);
    setupQuestion(questions[index]);
  };

  // Continuous Practice: Advance to next question or load/generate a new unattempted question
  const handleNextOrFetchMore = async () => {
    if (currentIndex < questions.length - 1) {
      navigateTo(currentIndex + 1);
      return;
    }

    const isDirty = userCode !== initialCode && !isSubmitted;
    if (isDirty) {
      setPendingNavIndex('NEXT_NEW');
      setShowWarning(true);
      return;
    }

    await loadAndAdvanceNextQuestion();
  };

  const loadAndAdvanceNextQuestion = async () => {
    try {
      setIsFetchingNext(true);
      const seenIds = questions.map((q) => q.id);
      const data = await fetchNextQuestion({
        mode: sessionConfig.mode,
        language: sessionConfig.language,
        difficulty: sessionConfig.difficulty,
        excludeIds: seenIds,
      });

      if (data && data.question) {
        const nextQ = data.question;
        const newQuestions = [...questions, nextQ];
        const newIndex = questions.length;
        setQuestions(newQuestions);
        setCurrentIndex(newIndex);
        setupQuestion(nextQ);
      } else {
        handleFinishSession();
      }
    } catch (err) {
      console.warn('Could not fetch next question:', err);
      handleFinishSession();
    } finally {
      setIsFetchingNext(false);
    }
  };

  const handleFinishSession = () => {
    setIsCompleted(true);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-300">Loading Practice Session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Session Notice</h3>
          <p className="text-sm text-slate-400">{error}</p>
          <button
            onClick={onGoHome}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <CompletionSummary
        stats={{
          total: questions.length,
          correct: correctQuestionIds.size,
          wrong: attemptedQuestionIds.size - correctQuestionIds.size,
        }}
        onPracticeAgain={async () => {
          setIsCompleted(false);
          setAttemptedQuestionIds(new Set());
          setCorrectQuestionIds(new Set());
          try {
            setLoading(true);
            const seenIds = questions.map((q) => q.id);
            const nextSessionId = `test_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
            const data = await fetchQuestions({
              mode: sessionConfig.mode,
              language: sessionConfig.language,
              difficulty: sessionConfig.difficulty,
              limit: 4,
              sessionId: nextSessionId,
              excludeIds: seenIds,
            });
            if (data && data.questions && data.questions.length > 0) {
              setQuestions(data.questions);
              setCurrentIndex(0);
              setupQuestion(data.questions[0]);
            } else {
              setCurrentIndex(0);
              setupQuestion(questions[0]);
            }
          } catch (err) {
            setCurrentIndex(0);
            setupQuestion(questions[0]);
          } finally {
            setLoading(false);
          }
        }}
        onGoHome={onGoHome}
      />
    );
  }

  const isPredictMode = sessionConfig.mode === 'PREDICT_OUTPUT';
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4 min-h-[calc(100vh-70px)] flex flex-col justify-between">
      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Left Column: Question Details & Prompt */}
        <QuestionPanel
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          modeKey={sessionConfig.mode}
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
          onSubmitAnswer={handleSubmitOption}
          isSubmitted={isSubmitted}
          result={result}
        />

        {/* Right Column: Code Editor & Result Panel */}
        <div className="flex flex-col space-y-4 h-full">
          {!isPredictMode && (
            <div className="flex-1 min-h-[350px]">
              <CodeEditor
                language={currentQuestion.language}
                value={userCode}
                onChange={setUserCode}
                onReset={handleReset}
                disabled={isRunning}
                missingCodePlaceholder={currentQuestion.missingCodePlaceholder}
                placeholder={
                  (sessionConfig.mode === 'WRITE_FROM_SCRATCH' || currentQuestion.mode === 'WRITE_FROM_SCRATCH') &&
                  (sessionConfig.language === 'sql' || currentQuestion.language === 'sql')
                    ? 'Write your SQL query here...'
                    : undefined
                }
              />
            </div>
          )}

          {/* Action Button for Coding Modes */}
          {!isPredictMode && (
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-lg">
              <span className="text-xs text-slate-400 font-medium">
                Click Run to execute against test cases
              </span>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-2 py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunning ? 'Running...' : currentQuestion.language === 'sql' ? 'Run Query' : 'Run Code'}</span>
              </button>
            </div>
          )}

          {/* Result Output Panel */}
          <ResultPanel
            result={result}
            isRunning={isRunning}
            isSql={currentQuestion.language === 'sql'}
            modeKey={sessionConfig.mode}
          />
        </div>
      </div>

      {/* Bottom Footer Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <button
          onClick={() => navigateTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-xs font-bold text-slate-400">
          Question {currentIndex + 1} of {questions.length}
        </div>

        {isLastQuestion ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleNextOrFetchMore}
              disabled={isFetchingNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>{isFetchingNext ? 'Loading...' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleFinishSession}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish Session</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleNextOrFetchMore}
            disabled={isFetchingNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>{isFetchingNext ? 'Loading...' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Unsaved Changes Warning Modal */}
      {showWarning && (
        <UnsavedWarningModal
          onConfirm={() => {
            setShowWarning(false);
            if (pendingNavIndex === 'NEXT_NEW') {
              setPendingNavIndex(null);
              loadAndAdvanceNextQuestion();
            } else if (pendingNavIndex !== null) {
              performNavigation(pendingNavIndex);
              setPendingNavIndex(null);
            }
          }}
          onCancel={() => {
            setShowWarning(false);
            setPendingNavIndex(null);
          }}
        />
      )}
    </div>
  );
}

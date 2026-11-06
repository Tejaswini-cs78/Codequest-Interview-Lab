import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import PracticeSession from './components/PracticeSession';
import SplashScreen from './components/SplashScreen';
import AuthPage from './components/AuthPage';
import LogoutModal from './components/LogoutModal';
import DeleteAccountModal from './components/DeleteAccountModal';

export default function App() {
  const [currentView, setCurrentView] = useState('splash'); // 'splash' | 'auth' | 'home' | 'session'
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authAlert, setAuthAlert] = useState('');
  
  // Modals state
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Practice session state
  const [sessionConfig, setSessionConfig] = useState(null);
  const [sessionStats, setSessionStats] = useState({
    attempted: 0,
    correct: 0,
    wrong: 0,
    accuracy: 0,
    total: 0,
  });

  // Verify stored session on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem('cq_auth_token');
    const storedUser = localStorage.getItem('cq_user');

    if (storedToken) {
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch {
          // ignore corrupted local user
        }
      }

      // Verify token with backend
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Invalid token');
        })
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            setToken(storedToken);
            localStorage.setItem('cq_user', JSON.stringify(data.user));
          }
        })
        .catch(() => {
          // Session expired or invalid
          localStorage.removeItem('cq_auth_token');
          localStorage.removeItem('cq_user');
          setUser(null);
          setToken(null);
        });
    }
  }, []);

  // When 2-second splash screen completes, automatically redirect to Login Page
  const handleSplashFinish = () => {
    setCurrentView('auth');
  };

  const handleAuthSuccess = (authenticatedUser, authToken) => {
    setUser(authenticatedUser);
    setToken(authToken);
    localStorage.setItem('cq_auth_token', authToken);
    localStorage.setItem('cq_user', JSON.stringify(authenticatedUser));
    setAuthAlert('');
    setCurrentView('home');
  };

  const handleStartSession = (config) => {
    setSessionConfig(config);
    setSessionStats({ attempted: 0, correct: 0, wrong: 0, accuracy: 0, total: 0 });
    setCurrentView('session');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSessionConfig(null);
  };

  // Logout Handlers
  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('cq_auth_token');
      localStorage.removeItem('cq_user');
      setUser(null);
      setToken(null);
      setSessionConfig(null);
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
      setAuthAlert('');
      setCurrentView('auth');
    }
  };

  // Delete Account Handlers
  const handleConfirmDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      if (token) {
        const res = await fetch('/api/auth/account', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        await res.json();
      }
    } catch (err) {
      console.error('Delete account error:', err);
    } finally {
      localStorage.removeItem('cq_auth_token');
      localStorage.removeItem('cq_user');
      setUser(null);
      setToken(null);
      setSessionConfig(null);
      setIsDeletingAccount(false);
      setIsDeleteModalOpen(false);
      setAuthAlert('Your account has been permanently deleted.');
      setCurrentView('auth');
    }
  };

  // Render Splash Screen
  if (currentView === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Render Auth Page (Login / Register)
  if (currentView === 'auth') {
    return (
      <AuthPage
        onAuthSuccess={handleAuthSuccess}
        alertMessage={authAlert}
        onClearAlert={() => setAuthAlert('')}
      />
    );
  }

  // Render Main App Views (Home Dashboard & Practice Session)
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      <Navbar
        activeMode={sessionConfig?.mode}
        activeLang={sessionConfig?.language}
        sessionStats={sessionStats}
        currentView={currentView}
        onGoHome={handleGoHome}
        user={user}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
        onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage onStartSession={handleStartSession} />
        )}

        {currentView === 'session' && sessionConfig && (
          <PracticeSession
            sessionConfig={sessionConfig}
            onUpdateStats={setSessionStats}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Confirmation Modals */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        isLoggingOut={isLoggingOut}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteAccount}
        isDeleting={isDeletingAccount}
      />
    </div>
  );
}

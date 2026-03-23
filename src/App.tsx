import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PublicView } from './components/PublicView';
import { AdminPanel } from './components/AdminPanel';
import { Login } from './components/Login';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Story, AppSettings } from './types';
import { DEFAULT_COMPANY_NAME } from './constants';
import { 
  auth, loginWithGoogle, logout, 
  onAuthStateChanged, User 
} from './firebase';

const DEFAULT_SETTINGS: AppSettings = {
  publicLanguage: 'it',
  companyName: DEFAULT_COMPANY_NAME,
};

export default function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Settings Listener
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    fetchSettings();
  }, []);

  // Stories Listener
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories');
        if (res.ok) {
          const data = await res.json();
          setStories(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch stories:', err);
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleAddStory = async (newStory: Omit<Story, 'id' | 'createdAt'>) => {
    try {
      const storyData = {
        ...newStory,
        createdAt: Date.now(),
      };
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyData),
      });
      if (res.ok) {
        const savedStory = await res.json();
        setStories(prev => [savedStory, ...prev]);
      }
    } catch (err) {
      console.error('Failed to add story:', err);
    }
  };

  const handleDeleteStory = async (id: string) => {
    try {
      const res = await fetch(`/api/stories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStories(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete story:', err);
    }
  };

  const handleUpdateSettings = async (newSettings: AppSettings) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const savedSettings = await res.json();
        setSettings(savedSettings);
      }
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!isAuthReady || (isLoading && stories.length === 0)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f5f5f0]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#5A5A40] border-t-transparent"></div>
      </div>
    );
  }

  // Check if user is the specific admin
  const isAdmin = user?.email === 'elitesellerbr@gmail.com';

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<PublicView stories={stories} settings={settings} />}
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminPanel
                    stories={stories}
                    settings={settings}
                    onAddStory={handleAddStory}
                    onDeleteStory={handleDeleteStory}
                    onUpdateSettings={handleUpdateSettings}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

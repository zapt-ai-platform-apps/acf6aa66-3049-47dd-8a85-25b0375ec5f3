import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useThemeStore, applyTheme } from '@/modules/core/theme';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import WelcomePage from './pages/WelcomePage';
import { useNotesStore } from './modules/notes/store';

export default function App() {
  const { darkMode } = useThemeStore();
  const { notes } = useNotesStore();
  const location = useLocation();
  
  // Apply theme on initial load and when it changes
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);
  
  // Determine if user has any notes (for redirects)
  const hasNotes = notes.length > 0;
  
  return (
    <div className="min-h-screen bg-background text-text">
      <Routes>
        {/* Welcome page (only shown if no notes exist) */}
        <Route 
          path="/" 
          element={
            hasNotes ? <Navigate to="/app" replace /> : <WelcomePage />
          } 
        />
        
        {/* Main application routes */}
        <Route 
          path="/app" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
        
        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
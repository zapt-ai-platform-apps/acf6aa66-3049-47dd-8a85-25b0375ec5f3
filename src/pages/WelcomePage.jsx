import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiBrain, FiSearch, FiTag } from 'react-icons/fi';
import { useNotesStore } from '@/modules/notes/store';
import Logo from '@/components/layout/Logo';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { createNote } = useNotesStore();
  
  const handleCreateNote = () => {
    createNote();
    navigate('/app');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-6">
          <Logo className="justify-center mb-2" />
          <p className="text-gray-600 dark:text-gray-300">
            AI-Enhanced Learning & Smart Content Analysis Interface
          </p>
        </div>
        
        <div className="card mb-8">
          <h1 className="text-2xl font-bold mb-4">Smart Note-Taking with AI</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ALESCAI combines the simplicity of note-taking with the power of AI analysis 
            to help you organize your thoughts, extract insights, and improve your content.
          </p>
          
          <button
            onClick={handleCreateNote}
            className="btn btn-primary inline-flex items-center gap-2 cursor-pointer"
          >
            <FiEdit3 size={18} />
            <span>Create Your First Note</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card flex flex-col items-center p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <FiEdit3 size={24} />
            </div>
            <h3 className="font-medium text-lg mb-2">Rich Text Editing</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Write notes with formatting, lists, and task tracking.
            </p>
          </div>
          
          <div className="card flex flex-col items-center p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <FiBrain size={24} />
            </div>
            <h3 className="font-medium text-lg mb-2">AI-Powered Insights</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Get content analysis, suggestions, and assistance.
            </p>
          </div>
          
          <div className="card flex flex-col items-center p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <FiTag size={24} />
            </div>
            <h3 className="font-medium text-lg mb-2">Smart Organization</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Organize with tags and AI-suggested topics.
            </p>
          </div>
        </div>
      </div>
      
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-10 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        Made on ZAPT
      </a>
    </div>
  );
};

export default WelcomePage;
import React, { useState, useEffect } from 'react';
import { FiBrain, FiRefreshCw, FiMessageSquare } from 'react-icons/fi';
import { analyzeNoteContent, generateContentSuggestions } from '@/modules/ai/service';
import { useNotesStore } from '@/modules/notes/store';
import AIAnalysis from './AIAnalysis';
import AISuggestions from './AISuggestions';

const AIInsights = ({ note }) => {
  const { updateNoteAIAnalysis } = useNotesStore();
  const [activeTab, setActiveTab] = useState('analysis');
  const [loading, setLoading] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  
  // Get analysis for the current note content
  useEffect(() => {
    if (!note || !note.content) return;
    
    // Skip analysis if content is too short
    if (note.content.length < 10) {
      updateNoteAIAnalysis(note.id, {
        summary: "Add more content to get AI insights.",
        topics: [],
        sentiment: "neutral",
        suggestions: ["Add more details to get better insights."]
      });
      return;
    }
    
    // Skip if we already have an analysis and content hasn't changed significantly
    if (note.aiAnalysis && note.content.length - note.aiAnalysis?.contentLength < 50) {
      return;
    }
    
    const getAnalysis = async () => {
      setLoading(true);
      try {
        const analysis = await analyzeNoteContent(note.content);
        if (analysis) {
          updateNoteAIAnalysis(note.id, {
            ...analysis,
            contentLength: note.content.length
          });
        }
      } catch (error) {
        console.error('Error analyzing note:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getAnalysis();
  }, [note, updateNoteAIAnalysis]);
  
  const handleRefreshAnalysis = async () => {
    if (!note || !note.content) return;
    
    setLoading(true);
    try {
      const analysis = await analyzeNoteContent(note.content);
      if (analysis) {
        updateNoteAIAnalysis(note.id, {
          ...analysis,
          contentLength: note.content.length
        });
      }
    } catch (error) {
      console.error('Error refreshing analysis:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGetSuggestions = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    
    setSuggestionsLoading(true);
    try {
      const results = await generateContentSuggestions(aiPrompt);
      setSuggestions(results);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setSuggestions(['Failed to generate suggestions. Please try again.']);
    } finally {
      setSuggestionsLoading(false);
    }
  };
  
  return (
    <div className="card h-full flex flex-col">
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex items-center gap-1 px-4 py-2 text-sm border-b-2 ${
            activeTab === 'analysis' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          } cursor-pointer`}
        >
          <FiBrain size={16} />
          <span>Analysis</span>
        </button>
        
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex items-center gap-1 px-4 py-2 text-sm border-b-2 ${
            activeTab === 'assistant' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          } cursor-pointer`}
        >
          <FiMessageSquare size={16} />
          <span>Assistant</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        {activeTab === 'analysis' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">AI Analysis</h3>
              
              <button
                onClick={handleRefreshAnalysis}
                disabled={loading}
                className="text-xs text-primary hover:text-primary/90 flex items-center gap-1 cursor-pointer"
              >
                <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span>{loading ? 'Analyzing...' : 'Refresh'}</span>
              </button>
            </div>
            
            <AIAnalysis 
              analysis={note?.aiAnalysis} 
              loading={loading}
              content={note?.content}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">AI Assistant</h3>
            
            <form onSubmit={handleGetSuggestions} className="space-y-2">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                placeholder="Ask for suggestions or improvements to your note..."
                className="input min-h-[80px] box-border"
              />
              
              <button
                type="submit"
                disabled={!aiPrompt.trim() || suggestionsLoading}
                className="btn btn-primary w-full cursor-pointer"
              >
                {suggestionsLoading ? 'Generating...' : 'Get Suggestions'}
              </button>
            </form>
            
            <AISuggestions suggestions={suggestions} loading={suggestionsLoading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
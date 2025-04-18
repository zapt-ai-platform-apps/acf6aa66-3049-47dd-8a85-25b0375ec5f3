import React from 'react';
import { FiFileText, FiTag, FiSmile, FiAlertCircle } from 'react-icons/fi';

const AIAnalysis = ({ analysis, loading, content }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 text-sm text-gray-500">Analyzing note...</div>
        </div>
      </div>
    );
  }
  
  if (!analysis) {
    if (!content || content.length < 10) {
      return (
        <div className="text-center p-4 text-gray-500">
          Add more content to get AI insights.
        </div>
      );
    }
    
    return (
      <div className="text-center p-4 text-gray-500">
        No analysis available yet. Click refresh to analyze.
      </div>
    );
  }
  
  // Determine sentiment icon and color
  let sentimentIcon;
  let sentimentColor;
  
  switch (analysis.sentiment) {
    case 'positive':
      sentimentIcon = <FiSmile />;
      sentimentColor = 'text-green-500';
      break;
    case 'negative':
      sentimentIcon = <FiAlertCircle />;
      sentimentColor = 'text-red-500';
      break;
    default:
      sentimentIcon = <FiSmile />;
      sentimentColor = 'text-gray-500';
  }
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FiFileText size={16} />
          <span className="text-sm font-medium">Summary</span>
        </div>
        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
          {analysis.summary}
        </p>
      </div>
      
      {analysis.topics.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FiTag size={16} />
            <span className="text-sm font-medium">Topics</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.topics.map((topic, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <div className={`flex items-center gap-2 ${sentimentColor}`}>
          {sentimentIcon}
          <span className="text-sm font-medium">
            Tone: {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
          </span>
        </div>
      </div>
      
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FiAlertCircle size={16} />
            <span className="text-sm font-medium">Suggestions</span>
          </div>
          <ul className="text-sm space-y-1">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
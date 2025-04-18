import React from 'react';

const AISuggestions = ({ suggestions, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 text-sm text-gray-500">Generating suggestions...</div>
        </div>
      </div>
    );
  }
  
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Ask the AI assistant for suggestions or improvements to your note.
      </div>
    );
  }
  
  return (
    <div className="space-y-3 mt-4">
      <h4 className="text-sm font-medium">Suggestions</h4>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm"
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;
import React, { useState } from 'react';
import { FiTag, FiPlus, FiX } from 'react-icons/fi';
import { useNotesStore } from '@/modules/notes/store';

const TAG_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f97316', // orange
  '#10b981', // emerald
  '#6366f1', // indigo
  '#f59e0b', // amber
  '#ef4444', // red
];

const NoteTags = ({ noteId }) => {
  const { 
    tags, 
    getTagsForNote, 
    addTagToNote, 
    removeTagFromNote, 
    createTag 
  } = useNotesStore();
  
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0]);
  
  const noteTags = getTagsForNote(noteId);
  
  const toggleTagMenu = () => {
    setShowTagMenu(!showTagMenu);
  };
  
  const handleCreateTag = (e) => {
    e.preventDefault();
    if (newTagName.trim()) {
      const tagId = createTag(newTagName.trim(), newTagColor);
      addTagToNote(noteId, tagId);
      setNewTagName('');
      setNewTagColor(TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]);
    }
  };
  
  const handleToggleTag = (tagId) => {
    const hasTag = noteTags.some(tag => tag.id === tagId);
    if (hasTag) {
      removeTagFromNote(noteId, tagId);
    } else {
      addTagToNote(noteId, tagId);
    }
  };
  
  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2">
        {noteTags.map(tag => (
          <div 
            key={tag.id} 
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700"
            style={{ borderLeft: `3px solid ${tag.color}` }}
          >
            <span>{tag.name}</span>
            <button 
              onClick={() => removeTagFromNote(noteId, tag.id)}
              className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              <FiX size={12} />
            </button>
          </div>
        ))}
        
        <button
          onClick={toggleTagMenu}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
        >
          <FiTag size={12} />
          <span>{noteTags.length > 0 ? 'Edit Tags' : 'Add Tags'}</span>
        </button>
      </div>
      
      {showTagMenu && (
        <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-surface shadow-lg rounded-md border border-border z-10">
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          
          <form onSubmit={handleCreateTag} className="mb-3">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New tag..."
                className="input text-sm py-1 box-border"
              />
              <div className="flex-shrink-0">
                <button 
                  type="submit"
                  disabled={!newTagName.trim()}
                  className="p-1 bg-primary text-white rounded-md disabled:opacity-50 cursor-pointer"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {TAG_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewTagColor(color)}
                  className={`w-5 h-5 rounded-full cursor-pointer ${
                    newTagColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </form>
          
          {tags.length > 0 ? (
            <div className="max-h-40 overflow-y-auto">
              {tags.map(tag => {
                const isSelected = noteTags.some(t => t.id === tag.id);
                return (
                  <div
                    key={tag.id}
                    onClick={() => handleToggleTag(tag.id)}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer ${
                      isSelected ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span>{tag.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center p-2">
              No tags yet. Create one above.
            </div>
          )}
          
          <div className="mt-3 flex justify-end">
            <button
              onClick={toggleTagMenu}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteTags;
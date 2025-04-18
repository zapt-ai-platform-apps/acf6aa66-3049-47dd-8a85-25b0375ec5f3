import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNotesStore } from '@/modules/notes/store';

const NotesList = ({ notes }) => {
  const { activeNoteId, setActiveNote, getTagById } = useNotesStore();
  
  if (notes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No notes found. Create a new note to get started.
      </div>
    );
  }
  
  const handleNoteClick = (noteId) => {
    setActiveNote(noteId);
  };
  
  return (
    <div className="space-y-2 p-2">
      {notes.map(note => {
        // Get preview - strip HTML tags and limit length
        const contentPreview = note.content
          .replace(/<[^>]*>?/gm, '')
          .slice(0, 80)
          .trim();
        
        return (
          <div 
            key={note.id}
            onClick={() => handleNoteClick(note.id)}
            className={`note-card ${activeNoteId === note.id ? 'selected' : ''}`}
          >
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{note.title || "Untitled Note"}</h3>
            
            {contentPreview && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {contentPreview}{contentPreview.length >= 80 ? '...' : ''}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
              </span>
              
              {note.tags.length > 0 && (
                <div className="flex space-x-1">
                  {note.tags.slice(0, 2).map(tagId => {
                    const tag = getTagById(tagId);
                    return tag ? (
                      <span 
                        key={tagId}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                    ) : null;
                  })}
                  {note.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{note.tags.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotesList;
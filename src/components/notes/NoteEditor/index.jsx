import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import NoteEditorToolbar from './NoteEditorToolbar';
import NoteTags from './NoteTags';
import { useNotesStore } from '@/modules/notes/store';
import AIInsights from '../AIInsights';
import * as Sentry from '@sentry/browser';

const NoteEditor = () => {
  const { getActiveNote, updateNote } = useNotesStore();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState(null);
  const [isAIVisible, setIsAIVisible] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      if (note) {
        const content = editor.getHTML();
        updateNote(note.id, { content });
      }
    },
  });
  
  useEffect(() => {
    const activeNote = getActiveNote();
    setNote(activeNote);
    
    if (activeNote) {
      setTitle(activeNote.title || '');
      
      if (editor) {
        editor.commands.setContent(activeNote.content || '');
      }
    }
  }, [getActiveNote, editor]);
  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value || 'Untitled Note';
    setTitle(newTitle);
    
    if (note) {
      updateNote(note.id, { title: newTitle });
    }
  };
  
  const toggleAIInsights = () => {
    setIsAIVisible(!isAIVisible);
  };
  
  if (!note) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">No Note Selected</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Select a note from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
          className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 px-0 box-border"
        />
        
        <div className="flex items-center justify-between mt-2">
          <NoteTags noteId={note.id} />
          
          <button
            onClick={toggleAIInsights}
            className="text-sm text-primary hover:text-primary/90 cursor-pointer"
          >
            {isAIVisible ? 'Hide AI Insights' : 'Show AI Insights'}
          </button>
        </div>
      </div>
      
      <div className={`flex flex-1 ${isAIVisible ? 'gap-4' : ''}`}>
        <div className={`card flex flex-col ${isAIVisible ? 'w-2/3' : 'w-full'} overflow-hidden`}>
          {editor && <NoteEditorToolbar editor={editor} />}
          <div className="flex-1 overflow-auto">
            <EditorContent editor={editor} className="h-full" />
          </div>
        </div>
        
        {isAIVisible && (
          <div className="w-1/3">
            <AIInsights note={note} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
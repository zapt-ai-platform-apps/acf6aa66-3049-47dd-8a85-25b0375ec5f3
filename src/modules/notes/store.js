import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export const useNotesStore = create(
  persist(
    (set, get) => ({
      notes: [],
      tags: [],
      activeNoteId: null,
      
      // Notes operations
      createNote: () => {
        const newNote = {
          id: uuidv4(),
          title: 'Untitled Note',
          content: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: [],
          aiAnalysis: null,
        };
        
        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        }));
        
        return newNote.id;
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) => 
            note.id === id ? { 
              ...note, 
              ...updates, 
              updatedAt: new Date().toISOString()
            } : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => {
          // If deleting active note, set first available note as active
          let newActiveId = state.activeNoteId;
          if (state.activeNoteId === id) {
            const remainingNotes = state.notes.filter(note => note.id !== id);
            newActiveId = remainingNotes.length > 0 ? remainingNotes[0].id : null;
          }
          
          return {
            notes: state.notes.filter(note => note.id !== id),
            activeNoteId: newActiveId,
          };
        });
      },
      
      setActiveNote: (id) => {
        set({ activeNoteId: id });
      },
      
      // Tags operations
      createTag: (name, color = '#94a3b8') => {
        const newTag = {
          id: uuidv4(),
          name,
          color,
        };
        
        set((state) => ({
          tags: [...state.tags, newTag],
        }));
        
        return newTag.id;
      },
      
      updateTag: (id, updates) => {
        set((state) => ({
          tags: state.tags.map((tag) => 
            tag.id === id ? { ...tag, ...updates } : tag
          ),
        }));
      },
      
      deleteTag: (id) => {
        // Remove tag from all notes
        set((state) => {
          const updatedNotes = state.notes.map(note => ({
            ...note,
            tags: note.tags.filter(tagId => tagId !== id),
            updatedAt: note.tags.includes(id) ? new Date().toISOString() : note.updatedAt
          }));
          
          return {
            notes: updatedNotes,
            tags: state.tags.filter(tag => tag.id !== id),
          };
        });
      },
      
      // Tagging operations
      addTagToNote: (noteId, tagId) => {
        set((state) => ({
          notes: state.notes.map((note) => 
            note.id === noteId && !note.tags.includes(tagId) ? { 
              ...note, 
              tags: [...note.tags, tagId],
              updatedAt: new Date().toISOString() 
            } : note
          ),
        }));
      },
      
      removeTagFromNote: (noteId, tagId) => {
        set((state) => ({
          notes: state.notes.map((note) => 
            note.id === noteId ? { 
              ...note, 
              tags: note.tags.filter(id => id !== tagId),
              updatedAt: new Date().toISOString() 
            } : note
          ),
        }));
      },
      
      // AI Analysis
      updateNoteAIAnalysis: (noteId, analysis) => {
        set((state) => ({
          notes: state.notes.map((note) => 
            note.id === noteId ? { 
              ...note, 
              aiAnalysis: analysis,
              updatedAt: new Date().toISOString() 
            } : note
          ),
        }));
      },
      
      // Getters
      getActiveNote: () => {
        const state = get();
        return state.notes.find(note => note.id === state.activeNoteId) || null;
      },
      
      getNoteById: (id) => {
        return get().notes.find(note => note.id === id) || null;
      },
      
      getTagById: (id) => {
        return get().tags.find(tag => tag.id === id) || null;
      },
      
      getTagsForNote: (noteId) => {
        const note = get().getNoteById(noteId);
        if (!note) return [];
        return note.tags.map(tagId => get().getTagById(tagId)).filter(Boolean);
      },
      
      getNotesByTag: (tagId) => {
        return get().notes.filter(note => note.tags.includes(tagId));
      },
    }),
    {
      name: 'alescai-notes',
    }
  )
);
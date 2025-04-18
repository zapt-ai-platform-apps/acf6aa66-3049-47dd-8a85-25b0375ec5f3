import React, { useState } from 'react';
import { FiPlus, FiTag, FiSearch } from 'react-icons/fi';
import { useNotesStore } from '@/modules/notes/store';
import NotesList from '../notes/NotesList';
import Logo from './Logo';

const Sidebar = ({ sidebarOpen }) => {
  const { notes, createNote, tags } = useNotesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  
  const handleCreateNote = () => {
    createNote();
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleTagSelect = (tagId) => {
    setSelectedTag(selectedTag === tagId ? null : tagId);
  };
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchTerm || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 w-64 flex flex-col bg-surface border-r border-border z-20 transform transition-transform md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Logo />
      </div>
      
      <div className="flex items-center p-2">
        <button
          onClick={handleCreateNote}
          className="btn btn-primary flex-1 flex items-center justify-center gap-1 cursor-pointer"
        >
          <FiPlus size={18} />
          <span>New Note</span>
        </button>
      </div>
      
      <div className="relative p-2">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input pl-9 box-border"
        />
        <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      </div>
      
      {tags.length > 0 && (
        <div className="p-2 border-t border-border">
          <div className="flex items-center mb-2">
            <FiTag className="mr-2 text-gray-500" />
            <span className="font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => handleTagSelect(tag.id)}
                className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                  selectedTag === tag.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                style={{ borderLeft: `3px solid ${tag.color}` }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        <NotesList notes={filteredNotes} />
      </div>
      
      <div className="p-2 text-xs text-center text-gray-500 border-t border-border">
        {notes.length} note{notes.length !== 1 ? 's' : ''}
      </div>
    </aside>
  );
};

export default Sidebar;
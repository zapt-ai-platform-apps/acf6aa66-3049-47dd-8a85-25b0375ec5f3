import React from 'react';
import { 
  FiBold, FiItalic, FiList, FiCheckSquare, 
  FiCode, FiLink, FiMinus, FiType
} from 'react-icons/fi';

const ToolbarButton = ({ onClick, isActive, icon, label }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
      isActive ? 'text-primary bg-gray-100 dark:bg-gray-700' : 'text-gray-500 dark:text-gray-400'
    }`}
    title={label}
  >
    {icon}
  </button>
);

const NoteEditorToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  
  return (
    <div className="border-b border-border p-2 flex flex-wrap gap-1">
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        icon={<FiBold size={18} />}
        label="Bold"
      />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        icon={<FiItalic size={18} />}
        label="Italic"
      />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive('highlight')}
        icon={<FiType size={18} />}
        label="Highlight"
      />
      
      <div className="h-6 border-r border-border mx-1"></div>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        icon={<span className="font-bold text-sm">H1</span>}
        label="Heading 1"
      />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        icon={<span className="font-bold text-sm">H2</span>}
        label="Heading 2"
      />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={editor.isActive('heading', { level: 4 })}
        icon={<span className="font-bold text-sm">H3</span>}
        label="Heading 3"
      />
      
      <div className="h-6 border-r border-border mx-1"></div>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        icon={<FiList size={18} />}
        label="Bullet List"
      />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        icon={<span className="font-medium">1.</span>}
        label="Numbered List"
      />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={editor.isActive('taskList')}
        icon={<FiCheckSquare size={18} />}
        label="Task List"
      />
      
      <div className="h-6 border-r border-border mx-1"></div>
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        icon={<FiCode size={18} />}
        label="Code Block"
      />
      
      <ToolbarButton 
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        icon={<FiMinus size={18} />}
        label="Horizontal Rule"
      />
      
      <ToolbarButton 
        onClick={() => {
          const url = window.prompt('URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        isActive={editor.isActive('link')}
        icon={<FiLink size={18} />}
        label="Add Link"
      />
    </div>
  );
};

export default NoteEditorToolbar;
import { useState } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Plus, Trash2, Edit3, Save, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotesAppProps {
  onBack: () => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export const NotesApp = ({ onBack }: NotesAppProps) => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const createNote = () => {
    const note: Note = { id: Date.now().toString(), title: '', content: '', updatedAt: new Date().toISOString() };
    setNotes(prev => [note, ...prev]);
    setEditingId(note.id);
    setEditTitle('');
    setEditContent('');
  };

  const saveNote = () => {
    setNotes(prev => prev.map(n => n.id === editingId ? { ...n, title: editTitle, content: editContent, updatedAt: new Date().toISOString() } : n));
    setEditingId(null);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  if (editingId) {
    return (
      <MobileScreen title="Edit Note" onBack={onBack}>
        <div className="flex flex-col h-full space-y-4">
          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Note title" className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} placeholder="Start writing..." className="flex-1 w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[200px]" />
          <Button onClick={saveNote} className="w-full"><Save className="w-4 h-4 mr-2" />Save Note</Button>
        </div>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen title="Notes" onBack={onBack}>
      <div className="space-y-4 pb-12">
        <Button onClick={createNote} className="w-full"><Plus className="w-4 h-4 mr-2" />New Note</Button>

        {notes.length === 0 ? (
          <div className="text-center py-12">
            <StickyNote className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No notes yet. Tap to create one.</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} onClick={() => startEdit(note)} className="card-ui rounded-xl p-4 cursor-pointer hover:bg-secondary/40 transition-all duration-200 active:scale-[0.98]">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{note.title || 'Untitled'}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.content || 'Empty note'}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">{new Date(note.updatedAt).toLocaleDateString()}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                  className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </MobileScreen>
  );
};

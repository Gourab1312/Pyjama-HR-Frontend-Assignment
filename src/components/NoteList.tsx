import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Note from './Note';

const NoteList: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  return (
    <div className="note-list">
      {pinnedNotes.length > 0 && (
        <div className="pinned-notes">
          <h2>Pinned Notes</h2>
          <div className="notes-grid">
            {pinnedNotes.map(note => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      {unpinnedNotes.length > 0 && (
        <div className="unpinned-notes">
          <h2>Notes</h2>
          <div className="notes-grid">
            {unpinnedNotes.map(note => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;
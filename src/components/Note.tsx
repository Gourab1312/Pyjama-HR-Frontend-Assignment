import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, togglePinNote } from '../store/noteSlice'; // Removed updateNoteColor
import { Note as NoteType } from '../types';

interface NoteProps {
  note: NoteType;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      {note.image && <img src={note.image} alt="Note" className="note-image" />}
      <div className="note-actions">
        <button onClick={() => dispatch(togglePinNote(note.id))} className="note-action-button">
          {note.isPinned ? 'Unpin' : 'Pin'}
        </button>
        <button onClick={() => dispatch(deleteNote(note.id))} className="note-action-button">Delete</button>
      </div>
    </div>
  );
};

export default Note;

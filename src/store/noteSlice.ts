import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types';

interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    togglePinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
      }
    },
    updateNoteColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      if (note) {
        note.color = action.payload.color;
      }
    },
    addImageToNote: (state, action: PayloadAction<{ id: string; image: string }>) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      if (note) {
        note.image = action.payload.image;
      }
    },
  },
});

export const { addNote, deleteNote, togglePinNote, updateNoteColor, addImageToNote } = noteSlice.actions;
export default noteSlice.reducer;
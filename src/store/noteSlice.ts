import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types';

interface NoteState {
  notes: Note[];
}

// Function to load notes from localStorage on mount
const loadNotesFromLocalStorage = (): Note[] => {
  const storedNotes = localStorage.getItem('notes');
  return storedNotes ? JSON.parse(storedNotes) : [];
};

// Function to save notes to localStorage after dispatch actions
const saveNotesToLocalStorage = (notes: Note[]) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

const initialState: NoteState = {
  notes: loadNotesFromLocalStorage(),
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      saveNotesToLocalStorage(state.notes);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      saveNotesToLocalStorage(state.notes);
    },
    togglePinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
        saveNotesToLocalStorage(state.notes);
      }
    },
    updateNoteColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      if (note) {
        note.color = action.payload.color;
        saveNotesToLocalStorage(state.notes);
      }
    },
    addImageToNote: (state, action: PayloadAction<{ id: string; image: string }>) => {
      const note = state.notes.find(note => note.id === action.payload.id);
      if (note) {
        note.image = action.payload.image;
        saveNotesToLocalStorage(state.notes);
      }
    },
  },
});

export const { addNote, deleteNote, togglePinNote, updateNoteColor, addImageToNote } = noteSlice.actions;
export default noteSlice.reducer;
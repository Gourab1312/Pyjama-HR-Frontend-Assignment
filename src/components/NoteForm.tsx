import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/noteSlice";
import { v4 as uuidv4 } from "uuid";

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState("#ffffff"); 
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(
        addNote({
          id: uuidv4(),
          title,
          content,
          isPinned: false,
          image,
          color, // Include color in the note object
        })
      );
      setTitle("");
      setContent("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      setColor("#ffffff"); // Reset color
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-form-input"
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-form-textarea"
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="note-form-file-input"
        ref={fileInputRef}
      />
      <div className="color-input-container">
        <p>Note Color : </p>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="note-color-picker"
      />
      </div>
      <button type="submit" className="note-form-button">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;

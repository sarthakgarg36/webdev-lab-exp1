import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title || !content) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const updateNote = () => {
    setNotes(
      notes.map((note) =>
        note.id === editId ? { ...note, title, content } : note
      )
    );

    setEditId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="container">
      <h1>My Notes App (CRUD - React SPA)</h1>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {editId ? (
        <button onClick={updateNote}>Update Note</button>
      ) : (
        <button onClick={addNote}>Add Note</button>
      )}

      {notes.map((note) => (
        <div className="note" key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button onClick={() => editNote(note)}>Edit</button>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
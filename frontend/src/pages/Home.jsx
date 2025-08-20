
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");


    useEffect(() => {
        getNotes();
    }, []);


    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => alert(err));
    };


    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    getNotes();
                } else {
                    alert("Failed to delete note.");
                }
            })
            .catch((error) => alert(error));
    };


    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    setTitle("");
                    setContent("");
                    getNotes();
                } else {
                    alert("Failed to make note.");
                }
            })
            .catch((err) => alert(err));
    };

    // ...existing code...
    // Add navigation for Login/Register
    const navigateTo = (path) => {
        window.location.hash = '';
        window.location.pathname = path;
    };

    // ...existing code...
    // Logout handler
    const handleLogout = () => {
        localStorage.clear();
        window.location.hash = '';
        window.location.pathname = '/login';
    };

    return (
        <div className="dashboard-root">
            <aside className="note-create-panel">
                <h2>Create a Note</h2>
                <form onSubmit={createNote} className="note-form">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="note-input"
                        autoComplete="off"
                        maxLength={100}
                    />
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="note-textarea"
                        rows={7}
                        maxLength={1000}
                    ></textarea>
                    <button type="submit" className="note-submit-btn">Create</button>
                    <div className="note-auth-btns">
                        <button type="button" className="note-auth-btn login-btn" onClick={() => navigateTo('/login')}>Login</button>
                        <button type="button" className="note-auth-btn register-btn" onClick={() => navigateTo('/register')}>Register</button>
                    </div>
                </form>
            </aside>
            <main className="notes-list-panel">
                <div className="notes-list-header">
                    <h2>All Notes</h2>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
                <div className="notes-list-scroll">
                    {notes.length === 0 ? (
                        <div className="no-notes-msg">No notes yet.</div>
                    ) : (
                        notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default Home;
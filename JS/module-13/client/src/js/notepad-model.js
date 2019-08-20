import * as api from "./services/api";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return api.getNotes().then(notes => {
      this._notes = notes;
      return this._notes;
    });
  }

  findNoteById(id) {
    for (let note of this._notes) {
      if (note.id === id) return note;
    }
  }

  saveNote(note) {
    return api.saveNote(note).then(savedNote => {
      this._notes.push(savedNote);
    });
  }

  deleteNote(id) {
    return api.deleteNote(id).then(() => {
      this._notes = this._notes.filter(note => note.id !== id);
      return id;
    });
  }

  updateNoteContent(id, updatedContent) {
    return api.updateNote(id, updatedContent).then(updatedNote => {
      const note = this.findNoteById(id);
      Object.assign(note, updatedNote);
      return updatedNote;
    });
  }

  updateNotePriority(id, newPriority) {
    return api.updateNote(id, newPriority).then(updatedNote => {
      const note = this.findNoteById(id);

      note.priority = updatedNote.priority;
      return note;
    });
  }

  filterNotesByQuery(query) {
    return new Promise(resolve => {
      setTimeout(() => {
        const noteFilteredByQuery = [];
        query = query.toLowerCase();
        for (const note of this._notes) {
          if (
            note.title.toLowerCase().includes(query) ||
            note.body.toLowerCase().includes(query)
          )
            noteFilteredByQuery.push(note);
        }
        resolve(noteFilteredByQuery);
      }, 300);
    });
  }

  filterNotesByPriority(priority) {
    const notefilterNotesByPriority = [];
    for (let note of this._notes) {
      if (note.priority === priority) {
        notefilterNotesByPriority.push(note);
      }
    }
    return notefilterNotesByPriority;
  }

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  };

  get notes() {
    return this._notes;
  }
}

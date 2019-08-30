import * as api from "./services/api";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  async getNotes() {
    try {
      const notes = await api.getNotes();
      this._notes = notes;

      return this._notes;
    } catch (error) {
      throw error;
    }
  }

  findNoteById(id) {
    for (let note of this._notes) {
      if (note.id === id) return note;
    }
  }

  async saveNote(note) {
    try {
      const savedNote = await api.saveNote(note);
      this._notes.push(savedNote);

      return savedNote;
    } catch (error) {
      throw error;
    }
  }
  async deleteNote(id) {
    try {
      await api.deleteNote(id);
      this._notes = this._notes.filter(note => note.id !== id);
      return id;
    } catch (error) {
      throw error;
    }
  }

  async updateNoteContent(id, updatedContent) {
    try {
      const updatedNote = api.updateNote(id, updatedContent);
      const note = this.findNoteById(id);
      Object.assign(note, updatedNote);

      return updatedNote;
    } catch (error) {
      throw error;
    }
  }

  async updateNotePriority(id, newPriority) {
    try {
      const updatedNote = await api.updateNote(id, newPriority);
      const note = this.findNoteById(id);

      note.priority = updatedNote.priority;
      return note;
    } catch (error) {
      throw error;
    }
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

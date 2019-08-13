export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (let note of this._notes) {
      if (note.id === id) return note;
    }
  }

  saveNote(note) {
    return new Promise(resolve => {
      setTimeout(() => {
        this._notes.push(note);
        resolve(note);
      }, 300);
    });
  }

  deleteNote(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const note = this.findNoteById(id);
        if (note.id === id) {
          resolve(this._notes.splice(this._notes.indexOf(note), 1));
        }
      }, 300);
    });
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (note.id === id) {
      Object.assign(note, updatedContent);
      return note;
    }
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (note.id === id) {
      note.priority = priority;
      return note;
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
}

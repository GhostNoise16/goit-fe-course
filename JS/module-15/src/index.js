"use strict";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  };
  findNoteById(id) {
    for (let note of this._notes) {
      if (note.id === id) return note;
    }
  }
  saveNote(note) {
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    const note = this.findNoteById(id);
    this._notes.splice(this._notes.indexOf(note), 1);
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    return Object.assign(note, updatedContent);
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    note.priority = priority;
    return note;
  }

  filterNotesByQuery(query) {
    const noteFilteredByQuery = [];
    query = query.toLowerCase();
    for (const note of this._notes) {
      if (
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query)
      )
        noteFilteredByQuery.push(note);
    }
    return noteFilteredByQuery;
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
}

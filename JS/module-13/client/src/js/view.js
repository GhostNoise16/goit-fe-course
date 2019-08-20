import templateNote from "../templates/note.hbs";

export const refs = {
  noteList: document.querySelector(".note-list"),
  noteForm: document.querySelector(".note-editor"),
  searchForm: document.querySelector(".search-form"),
  titleNoteForm: document.querySelector('input[name="note_title"]'),
  bodyNoteForm: document.querySelector('textarea[name="note_body"]'),
  openEditorBtn: document.querySelector('button[data-action="open-editor"]')
};

export const findParentNode = el => el.closest("li");

export const createNoteTemplate = notes => {
  const markup = notes.map(note => templateNote(note)).join("");
  return markup;
};

export const sortNotes = notes => {
  const sortNotes = [...notes];
  sortNotes.sort((a, b) => b.priority - a.priority);
  return notes;
};

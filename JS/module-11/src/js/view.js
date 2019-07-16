import templateNote from '../templates/note.hbs';
import initalNotes from '../assets/notes.json';


export const refs = {
  noteList: document.querySelector(".note-list"),
  noteForm: document.querySelector(".note-editor"),
  searchForm: document.querySelector(".search-form__input"),
  titleNoteForm: document.querySelector('input[name="note_title"]'),
  bodyNoteForm: document.querySelector('textarea[name="note_body"]'),
  saveNoteBtn: document.querySelector('.modal__btn[form="note-editor-form"]'),
  openEditorBtn: document.querySelector('button[data-action="open-editor"]'),
};

export const createNoteTemplate = notes => notes.map(note=>templateNote(note));
const markup = createNoteTemplate(initalNotes).join('');
refs.noteList.insertAdjacentHTML('beforeend', markup)
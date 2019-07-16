import { Notyf } from "notyf";
import Micromodal from "micromodal";
import { NOTIFICATION_MESSAGES } from "./utils/constants";
import { refs, createNoteTemplate } from "./view";
import templateNote from "../templates/note.hbs";
import Notepad from "./notepad-model";
import initialNotes from "../assets/notes.json";
import "notyf/notyf.min.css";
import '../sass/main.scss'

const notyf = new Notyf();
Micromodal.init();

export const notepad = new Notepad(initialNotes);

export const addListItem = (listRef, note) => {
  const noteCard = templateNote(note);
  listRef.insertAdjacentHTML("beforeend", noteCard);
};

export const openModal = () => {
  Micromodal.show("note-editor-modal");
};

export const submitNoteForm = event => {
  event.preventDefault();

  if (refs.titleNoteForm.value === "" || refs.bodyNoteForm.value === "") {
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }

  const newestNote = notepad.createNewNote(refs.titleNoteForm.value, refs.bodyNoteForm.value);

  notepad.saveNote(newestNote);
  refs.noteForm.reset();

  addListItem(refs.noteList, newestNote);

  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
  Micromodal.close("note-editor-modal");
};

export const removeListItem = target => {
  const deleteListItem = target.closest("li");
  notepad.deleteNote(deleteListItem.dataset.id);
  deleteListItem.remove();
};

export const deleteNotes = event => {
  if (
    event.target.nodeName === "I" &&
    event.target.closest("button").dataset.action === "delete-note"
  ) {
    removeListItem(event.target);
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
    console.log(notepad.notes);
  }
};

export const filterNotes = event => {
  const filteredNotes = notepad.filterNotesByQuery(event.target.value);
  const notesTemplate = createNoteTemplate(filteredNotes)
  refs.noteList.innerHTML = '';
  refs.noteList.insertAdjacentHTML('beforeend', notesTemplate);
};

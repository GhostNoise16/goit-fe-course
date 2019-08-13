import { Notyf } from "notyf";
import Micromodal from "micromodal";
import { NOTIFICATION_MESSAGES, SHORTID } from "./utils/constants";
import { refs, createNoteTemplate, findParentNode } from "./view";
import Notepad from "./notepad-model";
import initialNotes from "../assets/notes.json";
import storage from "./storage";
import "notyf/notyf.min.css";

const storageNotes = storage.load("notes");
const initNotes = storageNotes ? storageNotes : initialNotes;

const notyf = new Notyf();
const notepad = new Notepad(initNotes);
// Micromodal.init();

const submitNoteForm = event => {
  event.preventDefault();
  const newNote = {};

  if (refs.titleNoteForm.value === "" || refs.bodyNoteForm.value === "") {
    return notyf.error(`${NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY}`);
  }

  newNote.id = SHORTID.generate();
  newNote.title = refs.titleNoteForm.value;
  newNote.body = refs.bodyNoteForm.value;
  newNote.priority = Notepad.Priority.LOW;

  notepad.saveNote(newNote).then(savedNote => {
    storage.save("notes", notepad.notes);
    storage.remove("new-note-title");
    storage.remove("new-note-body");
    refs.noteForm.reset();

    const markup = createNoteTemplate(notepad.notes);
    refs.noteList.innerHTML = markup;

    notyf.success(`${NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS}`);
    Micromodal.close("note-editor-modal");
  });
};

const deleteNotes = event => {
  if (
    event.target.nodeName === "I" &&
    event.target.closest("button").dataset.action === "delete-note"
  ) {
    const parentNode = findParentNode(event.target);

    notepad.deleteNote(parentNode.dataset.id)
    .then(() => {
      storage.save("notes", notepad.notes);

      const markup = createNoteTemplate(notepad.notes);
      refs.noteList.innerHTML = markup;

      notyf.success(`${NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS}`);
    });
  }
};

const filterNotes = event => {
  const inputText = event.target;

  notepad.filterNotesByQuery(inputText.value.trim())
  .then(filteredItems => {
    const markup = createNoteTemplate(filteredItems);
    refs.noteList.innerHTML = markup;
  });
};

const openModal = () => {
  Micromodal.show("note-editor-modal");
};

const keyNewNote = event => {
  const [title, body] = refs.noteForm.elements;
  if (event.target === title) {
    storage.save("new-note-title", title.value);
  }

  if (event.target === body) {
    storage.save("new-note-body", body.value);
  }
};

refs.noteForm.addEventListener("submit", submitNoteForm);
refs.noteList.addEventListener("click", deleteNotes);
refs.searchForm.addEventListener("input", filterNotes);
refs.openEditorBtn.addEventListener("click", openModal);
refs.noteForm.addEventListener("keyup", keyNewNote);

const markup = createNoteTemplate(notepad.notes);
refs.noteList.innerHTML = markup;

const storageTitleNote = storage.load("new-note-title");
const storageBodyNote = storage.load("new-note-body");

if (storageTitleNote || storageBodyNote) {
  refs.noteForm.elements[0].value = storageTitleNote;
  refs.noteForm.elements[1].value = storageBodyNote;
}

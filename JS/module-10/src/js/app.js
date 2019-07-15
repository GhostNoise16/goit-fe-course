import { addListItem, renderNoteList, refs } from "./view";
import Notepad from "./notepad-model";
import initialNotes from "../assets/notes.json";
import { PRIORITY_TYPES , SHORTID} from "./utils/constants";

export const notepad = new Notepad(initialNotes);

export const submitNoteForm = event => {
  event.preventDefault();

  if (refs.titleNoteForm.value === "" || refs.bodyNoteForm.value === "") {
    return alert("Необходимо заполнить все поля!");
  }

  const submitedNote = {
    id: SHORTID.generate(),
    title: refs.titleNoteForm.value,
    body: refs.bodyNoteForm.value,
    priority: PRIORITY_TYPES.LOW
  };

  notepad.saveNote(submitedNote);
  refs.noteForm.reset();

  addListItem(refs.noteList, submitedNote);
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
    console.log(notepad.notes);
  }
};

export const filterNotes = event => {
  const filteredNotes = notepad.filterNotesByQuery(event.target.value);
  renderNoteList(refs.noteList, filteredNotes);
};

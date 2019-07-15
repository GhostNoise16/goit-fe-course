import "./sass/main.scss";
import { renderNoteList, refs } from "./js/view";
import { notepad, submitNoteForm, deleteNotes, filterNotes } from "./js/app";

renderNoteList(refs.noteList, notepad.notes);

refs.noteForm.addEventListener("submit", submitNoteForm);
refs.noteList.addEventListener("click", deleteNotes);
refs.searchForm.addEventListener("input", filterNotes);

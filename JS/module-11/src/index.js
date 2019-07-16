import "./sass/main.scss";
import { refs } from "./js/view";
import { openModal, submitNoteForm, deleteNotes, filterNotes } from "./js/app";

refs.openEditorBtn.addEventListener("click", openModal);
refs.saveNoteBtn.addEventListener("click", submitNoteForm);
refs.noteList.addEventListener("click", deleteNotes);
refs.searchForm.addEventListener("input", filterNotes);

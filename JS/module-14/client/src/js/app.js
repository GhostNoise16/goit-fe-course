import { Notyf } from "notyf";
import Micromodal from "micromodal";
import { NOTIFICATION_MESSAGES } from "./utils/constants";
import { refs, createNoteTemplate, findParentNode } from "./view";
import Notepad from "./notepad-model";
import initialNotes from "../assets/notes.json";
import "notyf/notyf.min.css";

const notyf = new Notyf();
const notepad = new Notepad(initialNotes);
// Micromodal.init();

const submitNoteForm = async event => {
  try{
    event.preventDefault();
  const newNote = {};

  if (refs.titleNoteForm.value === "" || refs.bodyNoteForm.value === "") {
    return notyf.error(`${NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY}`);
  }

  newNote.title = refs.titleNoteForm.value;
  newNote.body = refs.bodyNoteForm.value;
  newNote.priority = Notepad.Priority.LOW;

 await notepad
    .saveNote(newNote)
    
      refs.noteForm.reset();

      const markup = createNoteTemplate(notepad.notes);
      refs.noteList.innerHTML = markup;

      notyf.success(`${NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS}`);
      Micromodal.close("note-editor-modal");
  }
  catch(error){
    notyf.error(`${error}`);
  }
  
};

const deleteNotes = async event => {
  try {
    if (
      event.target.nodeName === "I" &&
      event.target.closest("button").dataset.action === "delete-note"
    ) {
      const parentNode = findParentNode(event.target);

      await notepad.deleteNote(parentNode.dataset.id);

      const markup = createNoteTemplate(notepad.notes);
      refs.noteList.innerHTML = markup;
      notyf.success(`${NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS}`);
    }
  } catch (error) {
    notyf.error(`${error}`);
  }
};

const filterNotes = event => {
  const inputText = event.target;

  notepad.filterNotesByQuery(inputText.value.trim()).then(filteredItems => {
    const markup = createNoteTemplate(filteredItems);
    refs.noteList.innerHTML = markup;
  });
};

const openModal = () => {
  refs.noteForm.reset();
  Micromodal.show("note-editor-modal");
};

refs.noteForm.addEventListener("submit", submitNoteForm);
refs.noteList.addEventListener("click", deleteNotes);
refs.searchForm.addEventListener("input", filterNotes);
refs.openEditorBtn.addEventListener("click", openModal);

const markup = createNoteTemplate(notepad.notes);
refs.noteList.innerHTML = markup;

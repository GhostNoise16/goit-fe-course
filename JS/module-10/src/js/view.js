import { ICON_TYPES, NOTE_ACTIONS, PRIORITY_TYPES } from "./utils/constants";

export const refs = {
  noteList: document.querySelector(".note-list"),
  noteForm: document.querySelector(".note-editor"),
  searchForm: document.querySelector(".search-form"),
  titleNoteForm: document.querySelector('input[name="note_title"]'),
  bodyNoteForm: document.querySelector('textarea[name="note_body"]')
};

const createActionButton = () => {
  const actionButton = document.createElement("button");
  actionButton.classList.add("action");
  return actionButton;
};

const createNoteContent = note => {
  const noteContent = document.createElement("div");
  noteContent.classList.add("note__content");

  const noteTitle = document.createElement("h2");
  noteTitle.classList.add("note__title");
  noteTitle.textContent = note.title;

  const noteBody = document.createElement("p");
  noteBody.classList.add("note__body");
  noteBody.textContent = note.body;

  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);

  return noteContent;
};

const createNoteFooter = note => {
  const noteFooter = document.createElement("footer");
  noteFooter.classList.add("note__footer");

  const notePrioritySection = document.createElement("section");
  notePrioritySection.classList.add("note__section");

  const decreasePriorityButton = createActionButton();
  decreasePriorityButton.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;

  const expandMoreIcon = document.createElement("i");
  expandMoreIcon.classList.add("material-icons", "action__icon");
  expandMoreIcon.textContent = ICON_TYPES.ARROW_DOWN;

  const increasePriorityButton = createActionButton();
  increasePriorityButton.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;

  const expandLessIcon = document.createElement("i");
  expandLessIcon.classList.add("material-icons", "action__icon");
  expandLessIcon.textContent = ICON_TYPES.ARROW_UP;

  const notePrioritySpan = document.createElement("span");
  notePrioritySpan.classList.add("note__priority");
  notePrioritySpan.textContent = `Priority: ${note.priority}`;

  decreasePriorityButton.appendChild(expandMoreIcon);
  increasePriorityButton.appendChild(expandLessIcon);
  notePrioritySection.append(
    decreasePriorityButton,
    increasePriorityButton,
    notePrioritySpan
  );

  const noteManipulationSection = document.createElement("section");
  noteManipulationSection.classList.add("note__section");

  const editNoteButton = createActionButton();
  editNoteButton.dataset.action = NOTE_ACTIONS.EDIT;

  const editIcon = document.createElement("i");
  editIcon.classList.add("material-icons", "action__icon");
  editIcon.textContent = ICON_TYPES.EDIT;

  const deleteNoteButton = createActionButton();
  deleteNoteButton.dataset.action = NOTE_ACTIONS.DELETE;

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("material-icons", "action__icon");
  deleteIcon.textContent = ICON_TYPES.DELETE;

  editNoteButton.appendChild(editIcon);
  deleteNoteButton.appendChild(deleteIcon);
  noteManipulationSection.append(editNoteButton, deleteNoteButton);

  noteFooter.append(notePrioritySection, noteManipulationSection);

  return noteFooter;
};

const createListItem = note => {
  const noteListItem = document.createElement("li");
  noteListItem.classList.add("note-list__item");
  noteListItem.dataset.id = note.id;

  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  noteDiv.append(createNoteContent(note), createNoteFooter(note));

  noteListItem.appendChild(noteDiv);

  return noteListItem;
};

export const renderNoteList = (listRef, notes) => {
  const itemsList = notes.map(note => createListItem(note));
  listRef.innerHTML = "";
  listRef.append(...itemsList);
};

export const addListItem = (listRef, note) => {
  const listItem = createListItem(note);
  listRef.append(listItem);
};

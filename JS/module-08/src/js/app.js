'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};


class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  };
  get notes() {
    return this._notes;
  };
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };
  findNoteById(id) {
    for (let note of this.notes) {
      if (note.id === id) return note;
    }
  };
  saveNote(note) {
    this.notes.push(note);
    return note;
  };
  deleteNote(id) {
    const note = this.findNoteById(id)
    this.notes.splice(this.notes.indexOf(note), 1);
  };
  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id)
    return Object.assign(note, updatedContent)
  };
  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    note.priority = priority;
    return note;
  };
  filterNotesByQuery(query) {
    const noteFilteredByQuery = [];
    query = query.toLowerCase();
    for (const note of this.notes) {
      if (note.title.toLowerCase().includes(query) || note.body.toLowerCase().includes(query))
        noteFilteredByQuery.push(note)
    }
    return noteFilteredByQuery;
  };
  filterNotesByPriority(priority) {
    const notefilterNotesByPriority = [];
    for (let note of this.notes) {
      if (note.priority === priority) {
        notefilterNotesByPriority.push(note)
      }
    }
    return notefilterNotesByPriority
  };
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];


const notepad = new Notepad(initialNotes);

const noteList = document.querySelector('.note-list');

const createActionButton = () => {
  const actionButton = document.createElement('button');
  actionButton.classList.add('action');
  return actionButton
};


const createNoteContent = note => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = note.title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = note.body;

  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);

  return noteContent
}



const createNoteFooter = note => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const notePrioritySection = document.createElement('section');
  notePrioritySection.classList.add('note__section');

  const decreasePriorityButton = createActionButton();
  decreasePriorityButton.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;

  const expandMoreIcon = document.createElement('i');
  expandMoreIcon.classList.add('material-icons', 'action__icon');
  expandMoreIcon.textContent = ICON_TYPES.ARROW_DOWN;

  const increasePriorityButton = createActionButton();
  increasePriorityButton.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;

  const expandLessIcon = document.createElement('i');
  expandLessIcon.classList.add('material-icons', 'action__icon');
  expandLessIcon.textContent = ICON_TYPES.ARROW_UP;

  const notePrioritySpan = document.createElement('span');
  notePrioritySpan.classList.add('note__priority');
  notePrioritySpan.textContent = `Priority: ${note.priority}`;

  decreasePriorityButton.appendChild(expandMoreIcon);
  increasePriorityButton.appendChild(expandLessIcon);
  notePrioritySection.append(decreasePriorityButton, increasePriorityButton, notePrioritySpan);


  const noteManipulationSection = document.createElement('section');
  noteManipulationSection.classList.add('note__section');

  const editNoteButton = createActionButton();
  editNoteButton.dataset.action = NOTE_ACTIONS.EDIT;

  const editIcon = document.createElement('i');
  editIcon.classList.add('material-icons', 'action__icon')
  editIcon.textContent = ICON_TYPES.EDIT;


  const deleteNoteButton = createActionButton();
  deleteNoteButton.dataset.action = NOTE_ACTIONS.DELETE;

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('material-icons', 'action__icon')
  deleteIcon.textContent = ICON_TYPES.DELETE;

  editNoteButton.appendChild(editIcon);
  deleteNoteButton.appendChild(deleteIcon);
  noteManipulationSection.append(editNoteButton, deleteNoteButton);

  noteFooter.append(notePrioritySection, noteManipulationSection);

  return noteFooter
}


const createListItem = note => {
  const noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = note.id;

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');


  noteDiv.append(createNoteContent(note), createNoteFooter(note));

  noteListItem.appendChild(noteDiv);

  return noteListItem
}


const renderNoteList = (listRef, notes) => {
  const itemsList = notes.map(note => createListItem(note));
  listRef.append(...itemsList)
}

renderNoteList(noteList, notepad.notes)
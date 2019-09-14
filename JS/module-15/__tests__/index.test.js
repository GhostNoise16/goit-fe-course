import Notepad from "../src/index";

const initialNotes = [
  {
    id: "id-1",
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: Notepad.Priority.HIGH
  },
  {
    id: "id-2",
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: Notepad.Priority.NORMAL
  }
];

describe("testing Notepad ", () => {
  it("should has initial notes", () => {
    const notepad = new Notepad(initialNotes);
    expect(notepad.notes).toEqual(initialNotes);
  });

  it("shoud find note by id", () => {
    const notepad = new Notepad(initialNotes);
    const note = notepad.findNoteById("id-1");
    expect(note.id).toBe("id-1");
  });

  it("should save note", () => {
    const notepad = new Notepad(initialNotes);
    const newNote = {
      id: "id-3",
      title: "Test note title",
      body: "Test note body",
      priority: Notepad.Priority.LOW
    };
    notepad.saveNote(newNote);
    expect(notepad.notes).toContain(newNote);
  });

  it("should delete note by id", () => {
    const notepad = new Notepad(initialNotes);
    const deletedNote = notepad.findNoteById("id-1");
    notepad.deleteNote(deletedNote.id);
    expect(notepad.notes).not.toContain(deletedNote);
  });

  it("should update note content by id", () => {
    const notepad = new Notepad(initialNotes);
    const newContent = {
      title: "Updated title!"
    };
    const updatedNote = notepad.findNoteById("id-3");
    notepad.updateNoteContent("id-3", newContent);
    expect(updatedNote.title).toBe("Updated title!");
  });

  it("should update note priority by id", () => {
    const notepad = new Notepad(initialNotes);
    notepad.updateNotePriority("id-2", Notepad.Priority.HIGH);
    const updatePriorNote = notepad.findNoteById("id-2");
    expect(updatePriorNote.priority).toBe(2);
  });

  it("should filter notes by query and return filtered notes", () => {
    const notepad = new Notepad(initialNotes);
    const filteredNotes = notepad.filterNotesByQuery("html");
    expect(filteredNotes).toContain(notepad.findNoteById("id-2"));
  });

  it("should filter notes by priority and retrn filtered notes", () => {
    const notepad = new Notepad(initialNotes);
    const filteredNotesByPrior = notepad.filterNotesByPriority(0);
    expect(filteredNotesByPrior).toContain(notepad.findNoteById("id-3"));
  });

  it("should filter notes by priority and retrn filtered notes", () => {
    const notepad = new Notepad(initialNotes);
    const filteredNotesByPrior = notepad.filterNotesByPriority(0);
    expect(filteredNotesByPrior.length).toBe(1);
  });
});

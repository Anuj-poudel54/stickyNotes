
const noteWrapper = document.querySelector(".notes-wrapper");
const noteInput = document.querySelector(".add-note-input");
const addNoteBtn = document.querySelector(".add-note-btn");
let currentNote = undefined;
let allNotes = localStorage.getItem("notes") || [];

function addEventToNote(note) {
    note.addEventListener("mousedown", (e) => {
        currentNote = note;
    });
    note.addEventListener("mouseup", () => {
        for (const ind in allNotes) {
            if (note.dataset.title === allNotes[ind].title) {
                allNotes[ind].x = note.style.left;
                allNotes[ind].y = note.style.top;
                break;
            }
        }
        console.log(allNotes);
        currentNote = undefined;
    });
}


function moveNoteTo(noteElement, x, y) {
    noteElement.style.left = x;
    noteElement.style.top = y;
}

function renderNote(noteMsg, pos = undefined) {
    const p = document.createElement("p");
    p.classList.add("note");
    p.dataset.title = noteMsg;
    p.innerHTML = ` ${noteMsg} <img src="../pin.png" width="30" height="30" alt="">`;
    if (pos !== undefined)
        moveNoteTo(p, pos.x, pos.y);

    noteWrapper.appendChild(p);
    addEventToNote(p);

    return p;

};

document.addEventListener("mousemove", (e) => {
    if (currentNote === undefined) return;
    moveNoteTo(currentNote, e.x + "px", e.y + "px");
})

function renderNotes() {
    if (!allNotes.length) return;
    allNotes = JSON.parse(allNotes);
    allNotes.forEach(noteObj => {
        renderNote(noteObj.title, { x: noteObj.x, y: noteObj.y });
    });
}

addNoteBtn.onclick = () => {
    const newNote = noteInput.value?.trim();
    if (!newNote) return;
    noteElement = renderNote(newNote);
    saveNote(noteElement);
}

function saveNote(noteElement) {
    allNotes.unshift(
        {
            title: noteElement.innerText,
            x: noteElement.style.left,
            y: noteElement.style.top,
        }
    );
    localStorage.setItem("notes", JSON.stringify(allNotes));
}

onbeforeunload = () => {
    localStorage.setItem("notes", JSON.stringify(allNotes));
}

renderNotes();
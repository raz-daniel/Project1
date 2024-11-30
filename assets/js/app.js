
function collectData() {
    const task=document.getElementById(`task`).value;
    const date=document.getElementById(`date`).value;
    const time=document.getElementById(`time`).value;
    const taskDateTime = new Date(date + "T" + time);

    const now = new Date();
    if (taskDateTime < now) {
        alert (`Task is in the past!`)
        return false;
    }
    return {
        task,
        date,
        time,
        id: now.toISOString(),
    }
}

function generateHTML(data) {
    return `
            <div class="note-background" data-id="${data.id}">
            <img src="assets/photos/notebg.png" alt="yellow sticky note pic">
            <div class="note-content">
                <span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="deleteNote(this)"></span>
                <p>${data.task}</p>
                <span>${data.date}</span>
                <span>${data.time}</span>
            </div>
        </div>
    `;
}

function renderHTML(newHTML) {
    const notesArea = document.getElementById(`notes-area`);
    notesArea.insertAdjacentHTML(`beforeend`, newHTML)
    const newNote=notesArea.lastElementChild;
    newNote.classList.add(`fade-in`)
}

function saveToStorage(data) {
    const storage = JSON.parse(localStorage.getItem(`tasks`)) || [];
    storage.push(data);
    localStorage.setItem(`tasks`, JSON.stringify(storage));
}

function clearForm() {
    document.getElementById(`my-task-board-form`).reset();
    document.getElementById(`task`).focus();
}

function addTask(event) {
    event.preventDefault();
    const data=collectData();
    if (data) {
        const newHTML=generateHTML(data);
        renderHTML(newHTML);
        saveToStorage(data);
        clearForm();
    }
}

function deleteNote(span) {
    const noteContainer=span.closest(`.note-background`);
    const noteId = noteContainer.dataset.id;


    noteContainer.remove();
    const storage = JSON.parse(localStorage.getItem(`tasks`)) || [];
    const updateStorage = [];
    for (const task of storage) {
        if (task.id !== noteId) {
            updateStorage.push(task);
        }
    }
    localStorage.setItem(`tasks`, JSON.stringify(updateStorage));
}

function renderStoredNotes(newHTML) {
    const notesArea = document.getElementById('notes-area');
    notesArea.innerHTML += newHTML;
}

function loadStorage() {
    const storage = JSON.parse(localStorage.getItem(`tasks`)) || [];
    const updateStorage = []
    let newHTML = "";
    for (const task of storage) {
        if (new Date(task.date + "T" + task.time) >= new Date()) {
            updateStorage.push(task);
            newHTML+=generateHTML(task)
        }
    }
    if (newHTML) {
        renderStoredNotes(newHTML);
    }
    localStorage.setItem(`tasks`, JSON.stringify(updateStorage));

}

loadStorage();
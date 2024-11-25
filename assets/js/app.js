function collectData(index) {
    const description = document.getElementById('description').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    const  index = getNumberOfTasksInLocalStorage();
    return {
        index, 
        description,
        date,
        time
    }
}

function generateHTML(data) {
    const newHTML = `
    <div class="task">
                <div>
                    <img src="assets/photos/tile.jpg" onclick="deleteTask()">
                </div>
                <div>${data.description}</div>
                <div>${data.date}</div>
                <div>${data.time}</div>
            </div>
    `
    return newHTML
}

function renderHTML(newHTML) {
    const tasksContainer = document.getElementById('tasks')
    tasksContainer.innerHTML += newHTML
}

function clearForm() {
    const taskForm = document.getElementById('taskForm')
    taskForm.reset()

    const description = document.getElementById('description')
    description.focus()
}

function saveTaskToStorage(data) {
    const currentTasksInStorageJSON = JSON.parse(localStorage.getItem('tasks')) || [];
    currentTasksInStorageJSON.push(data)
    localStorage.setItem('tasks', JSON.stringify(currentTasksInStorageJSON))
}

function addTask(event) {
    event.preventDefault()
    const data = collectData()
    const newHTML = generateHTML(data)
    saveTaskToStorage(data)
    renderHTML(newHTML)
    clearForm()
}

function getNumberOfTasksInLocalStorage() {
    return JSON.parse(localstorage.getItem(`tasks`)).length
}

function loadTaskFromLocalStorage() {
    const currentTasksInStorageJSON = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const task of currentTasksInStorageJSON) {
        if (task.date < date) {
            const newHTML = generateHTML(task)
            renderHTML(newHTML)
        }
    }
}
// function initStorage() {
//     const currentTasksInStorageJSON = localStorage.getItem('tasks');
//     if (!currentTasksInStorageJSON) {
//         localStorage.setItem(`tasks`, [])
//     }
// }

// initStorage()

function deleteTask() {
    alert (`will delete item #${index} from local storage`)
}

loadTaskFromLocalStorage()
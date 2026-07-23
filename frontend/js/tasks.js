import { verifyAPI } from "./api.js";
import { translations } from "./translation.js";

verifyAPI()

function loadTasks() {
    const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
    fetch ("/tasks/")
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => a.is_completed - b.is_completed);
        data.forEach((task, i) => {
            const taskCard = document.createElement('div');
            taskCard.className = "bg-zinc-800/50 backdrop-blur-md p-4 rounded-xl flex items-center justify-between mb-4" ;
            const buttonGroup = document.createElement('div') ;
            buttonGroup.className = "flex items-center gap-3" ;
            const title = document.createElement('h3');
            const doneButton = document.createElement('button') ;
            doneButton.className ="w-6 h-6 rounded-full border-2 border-emerald-500" ;
            const deleteButton = document.createElement('button') ;
            deleteButton.className ="ph ph-trash text-zinc-100 bg-red-600/80 hover:bg-red-500 p-2 rounded-lg transition-colors cursor-pointer" ;
            if (task.is_completed === true) {
                doneButton.classList.add("bg-emerald-500")
                taskCard.classList.remove("bg-zinc-800/50")
                taskCard.classList.add("bg-emerald-900/30")
                title.classList.add("line-through")
                title.classList.add("text-zinc-500")
            }
            doneButton.addEventListener('click', () => {
                doneButton.classList.toggle("bg-emerald-500")
                taskCard.classList.toggle("bg-zinc-800/50")
                taskCard.classList.toggle("bg-emerald-900/30")
                title.classList.toggle("line-through")
                title.classList.toggle("text-zinc-500")

                task.is_completed = !task.is_completed ;

                if (task.is_completed === true) {
                    document.getElementById('tasks-container').appendChild(taskCard)
                } else {
                    document.getElementById('tasks-container').prepend(taskCard)
                }

                fetch(`/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        is_completed: task.is_completed
                    })
                })
            })
            deleteButton.addEventListener('click', () => {
                fetch(`/tasks/${task.id}`, {
                    method: 'DELETE' ,
                })
                taskCard.remove()
            })
            title.textContent = task.title;
            taskCard.appendChild(title)
            buttonGroup.appendChild(doneButton)
            buttonGroup.appendChild(deleteButton)
            taskCard.appendChild(buttonGroup)
            document.getElementById('tasks-container').appendChild(taskCard)
            });
        if (data.length === 0) {
            const emptyCard = document.createElement('div')
            emptyCard.className = "flex flex-col h-64 items-center justify-center p-4 rounded-xl mt-40 mb-4"
            const emptyTitle = document.createElement('h2');
            emptyTitle.className = "text-zinc-500 text-2xl font-bold"
            emptyTitle.innerText = translations[savedLanguage].nothing_today;
            const emptyIcon = document.createElement('h2');
            emptyIcon.className = "text-zinc-500 ph ph-checks text-7xl font-bold text-center"
            emptyCard.appendChild(emptyTitle)
            emptyCard.appendChild(emptyIcon)
            document.getElementById('tasks-container').appendChild(emptyCard)
        }
    })
}

loadTasks()

document.getElementById('create-task-button').addEventListener('click', () => {
    const title = document.getElementById('new-task-title').value.trim();
    const description = document.getElementById('new-task-description').value;

    if (title === null || title === "") {
        const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
        alert(translations[savedLanguage].no_title_alert);
        document.getElementById('new-task-title').value = ""
        document.getElementById('new-task-description').value = ""
        return;
    }

    fetch (`/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title ,
            description: description
        })
    }
    )
    .then( () => {
        document.getElementById('new-task-title').value = ""
        document.getElementById('new-task-description').value = ""
        document.getElementById('tasks-container').innerHTML = ""
        document.getElementById('creation-modal').classList.toggle('hidden')
        loadTasks()
    })
})

document.getElementById('open-modal-button').addEventListener('click', () => {
document.getElementById('creation-modal').classList.toggle('hidden')
})

document.getElementById('close-modal-button').addEventListener('click', () => {
document.getElementById('creation-modal').classList.toggle('hidden')
})

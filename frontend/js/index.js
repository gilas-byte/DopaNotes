import { verifyAPI } from "./api.js";
import { translations } from "./translation.js";

console.log("Veryfing API");

verifyAPI();

console.log("The functions will start to load!");

function loadHabitsData() {
    fetch("/habits/")
        .then(response => response.json())
        .then(data => {
            const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
            const streakList = data.map(habit => habit.streak);
            const biggestStreak = streakList.length > 0 ? Math.max(...streakList) : 0; // making like this, the possibility of -infinity is none, making it "NaN proof"

            if (biggestStreak === 1) {
                document.getElementById("streak-text").innerText = biggestStreak + " " + translations[savedLanguage].day_streak;
            } else {
                document.getElementById("streak-text").innerText = biggestStreak + " " + translations[savedLanguage].days_streak;
            }

            const today = new Date().toISOString().split('T')[0];
            const completedHabits = data.filter(habit =>
                habit.last_check !== null && habit.last_check.split('T')[0] === today);

            const percentage = data.length > 0 ? (completedHabits.length / data.length) * 100 : 0;

            if (data.length === 0) {
                document.getElementById("habits-count").innerText = "0";
            } else {
                document.getElementById("habits-count").innerText = completedHabits.length + "/" + data.length;
            }
            document.getElementById("habits-bar").style.width = percentage + "%";
    });
};

loadHabitsData();

function loadTasksData() {
    fetch("/tasks/")
        .then(response => response.json())
        .then(data => {
            const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
            const completedTasks = data.filter(task => task.is_completed === true);
            const percentage = (completedTasks.length / data.length) * 100;
            let taskText = ""
            if (data.length === 0) {
                document.getElementById("tasks-count").innerText = "0";
            } else {
                document.getElementById("tasks-count").innerText = completedTasks.length + "/" + data.length;
            }
            if (percentage === 100) {
                taskText = translations[savedLanguage].all_done;
            } else if (percentage < 100 && percentage >= 50) {
                taskText = translations[savedLanguage].almost_there;
            } else {
                taskText = translations[savedLanguage].lets_go;
                document.getElementById("tasks-bar").style.width = 0 + "%";
            }
            document.getElementById("tasks-bar").style.width = percentage + "%";
            document.getElementById("tasks-text").innerText = taskText;
        })
};

loadTasksData();

function clearModal() {
    document.getElementById('new-object-title').value = ""
    document.getElementById('new-object-description').value = ""
}

document.getElementById('open-modal-button').addEventListener('click', () => {
    console.log("The button has been pressed!");
    document.getElementById('creation-modal').classList.toggle('hidden')
    });

document.getElementById('close-modal-button').addEventListener('click', () => {
    document.getElementById('creation-modal').classList.toggle('hidden')
    });


function addCreateObjectEvent() {
    document.getElementById('create-object-button').addEventListener('click', () => {
        const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
        const title = document.getElementById('new-object-title').value.trim();
        const description = document.getElementById('new-object-description').value;
        const selectedRadio = document.querySelector('input[name="object-type"]:checked');
        let type = ""
        if (selectedRadio === null) {
            alert(translations[savedLanguage].no_type_alert);
            return;
        } else{
            type = selectedRadio.value;
        }

        console.log(title, "-", description, "-", type)

        if (title === null || title === "") {
            alert(translations[savedLanguage].no_title_alert);
            clearModal();
            return;
        }

        if (type === "task") {
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
                clearModal();
                document.getElementById('creation-modal').classList.toggle('hidden')
                loadTasksData();
                return;
            })
        } else if (type === "habit") {
            fetch (`/habits/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                title: title ,
                description: description
                })
            })

            .then( () => {
                clearModal();
                document.getElementById('creation-modal').classList.toggle('hidden')
                loadHabitsData();
                return;
            })
        } else {
            alert(translations[savedLanguage].no_type_alert);
            return;
        }
    });
}

addCreateObjectEvent()

console.log("The functions have been loaded!");
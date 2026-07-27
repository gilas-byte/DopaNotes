import { verifyAPI } from "./api.js";
import { translations } from "./translation.js";
import { createModal, setupModalListeners, clearModal } from './modal.js';

verifyAPI();

console.log('API Verified')

document.getElementById('modal-container').innerHTML = createModal();

console.log("The functions will start to load...");

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

setupModalListeners(loadTasksData(), loadHabitsData(), "noFunctionYet");

document.getElementById('open-object-modal-button').addEventListener('click', () => {
    document.getElementById('object-creation-modal').classList.toggle('hidden')
});

console.log("The functions have been loaded!");
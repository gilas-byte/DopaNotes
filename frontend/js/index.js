import { verifyAPI } from "./api.js";
import { translations } from "./translation.js";

verifyAPI()

function loadHabitsData() {
    fetch("/habits/")
        .then(response => response.json())
        .then(data => {
            const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';

            // Collect the streak value of every habit into a plain array.
            const streakList = data.map(habit => habit.streak);

            // Math.max() over an EMPTY array returns -Infinity, not 0.
            // Reason: the maximum of an empty set is, by definition, the
            // smallest possible value (so any real number would "win").
            // Without this guard, a user with no habits would see
            // "-Infinity day streak". So: if the list is empty, default to 0.
            const biggestStreak = streakList.length > 0 ? Math.max(...streakList) : 0;

            if (biggestStreak === 1) {
                document.getElementById("streak-text").innerText = biggestStreak + " " + translations[savedLanguage].day_streak;
            } else {
                document.getElementById("streak-text").innerText = biggestStreak + " " + translations[savedLanguage].days_streak;
            }

            const today = new Date().toISOString().split('T')[0];
            const completedHabits = data.filter(habit =>
                habit.last_check !== null && habit.last_check.split('T')[0] === today);

            // Guard the division too: 0 habits would make (0 / 0) = NaN,
            // and "NaN%" is an invalid CSS width. Empty list -> 0%.
            const percentage = data.length > 0 ? (completedHabits.length / data.length) * 100 : 0;

            if (data.length === 0) {
                document.getElementById("habits-count").innerText = "0";
            } else {
                document.getElementById("habits-count").innerText = completedHabits.length + "/" + data.length;
            }
            document.getElementById("habits-bar").style.width = percentage + "%";
    });
}

loadHabitsData()

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
            // If percentage is NaN (no tasks), the assignment below is ignored
            // by the browser, so the "0%" width set just above is kept.
            document.getElementById("tasks-bar").style.width = percentage + "%";
            document.getElementById("tasks-text").innerText = taskText;
        })
}

loadTasksData()

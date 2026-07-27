import { verifyAPI } from "./api.js";
import { translations } from "./translation.js";
import { createModal, setupModalListeners, clearModal } from './modal.js';

verifyAPI()

document.getElementById('modal-container').innerHTML = createModal();

setupModalListeners();

document.getElementById('open-object-modal-button').addEventListener('click', () => {
    document.getElementById('object-creation-modal').classList.toggle('hidden')
});

function clearHabitModal() {
    document.getElementById('new-habit-title').value = ""
}

function createHabitCard(habit) {
    const habitCard = document.createElement('div');
    habitCard.className = "bg-zinc-800/50 p-4 rounded-xl flex justify-between items-center mb-3";
    const titleGroup = document.createElement('div');
    titleGroup.className = "flex items-center gap-4";
    const streakIcon = document.createElement('i');
    streakIcon.className = "ph ph-fire text-orange-500 text-xl";
    const streakGroup = document.createElement('div');
    streakGroup.className = "flex items-center gap-2 text-zinc-400";
    const title = document.createElement('span');
    title.className = "text-lg font-semibold";
    const doneButton = document.createElement('button');
    doneButton.className = "w-6 h-6 rounded-full border-2 border-violet-500 hover:bg-violet-500/20 transition";
    const deleteButton = document.createElement('button');
    deleteButton.className = "hover:text-red-500 transition";
    const deleteIcon = document.createElement('i');
    deleteIcon.className = "ph ph-trash text-xl";
    const streakNumber = document.createElement('span');
    streakNumber.className = "font-bold mr-2";
    
    title.textContent = habit.title;
    streakNumber.textContent = habit.streak;

    const today = new Date().toISOString().split('T')[0];

    if (habit.last_check !== null && habit.last_check.split('T')[0] === today) {
        doneButton.classList.add("bg-emerald-500");
        habitCard.classList.remove("bg-zinc-800/50");
        habitCard.classList.add("bg-emerald-900/30");
        title.classList.add("line-through");
        title.classList.add("text-zinc-500");
    }

    // Cria uma variável clara para saber se já foi feito hoje
    let isCompletedToday = habit.last_check !== null && habit.last_check.split('T')[0] === today;

    // Aplica o estilo inicial se já estiver feito
    if (isCompletedToday) {
        doneButton.classList.add("bg-emerald-500");
        habitCard.classList.remove("bg-zinc-800/50");
        habitCard.classList.add("bg-emerald-900/30");
        title.classList.add("line-through", "text-zinc-500");
    }

    doneButton.addEventListener('click', () => {

        isCompletedToday = !isCompletedToday;

        fetch(`/habits/${habit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_completed: isCompletedToday
            })
        });

        let actualStreak = habit.streak;

        if (isCompletedToday) {
            streakNumber.textContent = actualStreak;
            doneButton.classList.add("bg-emerald-500");
            habitCard.classList.remove("bg-zinc-800/50");
            habitCard.classList.add("bg-emerald-900/30");
            title.classList.add("line-through", "text-zinc-500");
        } else {
            streakNumber.textContent = actualStreak;
            doneButton.classList.remove("bg-emerald-500");
            habitCard.classList.add("bg-zinc-800/50");
            habitCard.classList.remove("bg-emerald-900/30");
            title.classList.remove("line-through", "text-zinc-500");
        }
    });

    deleteButton.addEventListener('click', () => {
        fetch(`/habits/${habit.id}`, {
            method: 'DELETE'
        });
        habitCard.remove();
        document.getElementById('habits-container').innerHTML = ""
        setTimeout( () => {
            loadHabits();
        }, 500)
    });

    titleGroup.appendChild(doneButton);
    titleGroup.appendChild(title);
    deleteButton.appendChild(deleteIcon);
    streakGroup.appendChild(streakIcon);
    streakGroup.appendChild(streakNumber);
    streakGroup.appendChild(deleteButton);
    habitCard.appendChild(titleGroup);
    habitCard.appendChild(streakGroup);

    return habitCard;
}

function loadHabits() {
    fetch("/habits/")
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
                const emptyCard = document.createElement('div');
                emptyCard.className = "flex flex-col h-64 items-center justify-center p-4 rounded-xl mt-40 mb-4";
                const emptyTitle = document.createElement('h2');
                emptyTitle.className = "text-zinc-500 text-2xl font-bold";
                emptyTitle.innerText = translations[savedLanguage].no_habits;
                const emptyIcon = document.createElement('h2');
                emptyIcon.className = "text-zinc-500 ph ph-checks text-7xl font-bold text-center";
                emptyCard.appendChild(emptyTitle);
                emptyCard.appendChild(emptyIcon);
                document.getElementById('habits-container').appendChild(emptyCard);
                
                return;
            }

            const today = new Date().toISOString().split('T')[0];

            data.sort((a, b) => {
                const aCompleted = a.last_check !== null && a.last_check.split('T')[0] === today;
                const bCompleted = b.last_check !== null && b.last_check.split('T')[0] === today;
                return aCompleted - bCompleted;
            });

            data.forEach((habit) => {
                const card = createHabitCard(habit);
                document.getElementById('habits-container').appendChild(card);
            });
        });
}


loadHabits();

document.getElementById('create-habit-button').addEventListener('click', () => {
    const title = document.getElementById('new-habit-title').value.trim();

    if (title === null || title === "") {
        const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
        alert(translations[savedLanguage].no_title_alert);
        clearHabitModal()
        return;
    }

    fetch (`/habits/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title ,
        })
    }
    )
    .then( () => {
        clearHabitModal()
        document.getElementById('habits-container').innerHTML = ""
        document.getElementById('creation-modal').classList.toggle('hidden')
        loadHabits()
    })
});

document.getElementById('open-modal-button').addEventListener('click', () => {
    document.getElementById('creation-modal').classList.toggle('hidden')
    });

document.getElementById('close-modal-button').addEventListener('click', () => {
    const interfaceElement = document.getElementById('creation-interface');
    const modalBackground = document.getElementById('creation-modal');
    interfaceElement.classList.add('pop-out-anim-modal');
    setTimeout(() => {
        modalBackground.classList.add('hidden');
        interfaceElement.classList.remove('pop-out-anim-modal');
        clearModal() 
        }, 200); 
    });
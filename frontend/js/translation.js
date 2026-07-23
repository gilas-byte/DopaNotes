export const translations = {
    pt: {
        home: "Início",
        tasks: "Tarefas",
        todays_tasks: "Tarefas de Hoje",
        habits: "Hábitos",
        todays_habits: "Hábitos de Hoje",
        settings: "Configurações",
        language: "Idioma",
        loading: "Carregando...",
        quick_notes: "Notas Rápidas",
        notes_count: "0 Notas",
        projects: "Projetos",
        projects_count: "0 Projetos",
        all_done: "Todas feitas!",
        almost_there: "Quase lá!",
        lets_go: "Bora lá!",
        nothing_today: "Por hoje não tem nada, crie uma nova tarefa ou descanse!",
        day_streak: "dia de sequência",
        days_streak: "dias de sequência",
        which_task: "Qual tarefa?",
        task_title: "Título da tarefa",
        task_description: "Descrição da tarefa",
        create_task: "Criar Tarefa",
        new_task: "+ Nova Tarefa",
        no_title_alert: "Não pode enviar uma tarefa sem título!"
    },
    en: {
        home: "Home",
        tasks: "Tasks",
        todays_tasks: "Today's Tasks",
        habits: "Habits",
        todays_habits: "Today's Habits",
        settings: "Settings",
        language: "Language",
        loading: "Loading...",
        quick_notes: "Quick Notes",
        notes_count: "0 Notes",
        projects: "Projects",
        projects_count: "0 Projects",
        all_done: "All done!",
        almost_there: "Almost there!",
        lets_go: "Let's go!",
        nothing_today: "Nothing for today, create a new task or take a rest!",
        day_streak: "day streak",
        days_streak: "day streak",
        which_task: "Which task?",
        task_title: "Task title",
        task_description: "Task description",
        create_task: "Create Task",
        new_task: "+ New Task",
        no_title_alert: "You can't submit a task without a title!"
    }
};

export function applyTranslation(language) {
    // Fall back to Portuguese if the requested language does not exist.
    const dictionary = translations[language] || translations.pt;
    localStorage.setItem('savedLanguage', language);

    // Translate text nodes marked with data-i18n.
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (dictionary[key] !== undefined) {
            element.innerText = dictionary[key];
        }
    });

    // Translate input/textarea placeholders marked with data-i18n-placeholder.
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (dictionary[key] !== undefined) {
            element.placeholder = dictionary[key];
        }
    });

    // Keep the language selector (settings page) in sync with the active language.
    const languageMenu = document.getElementById('language-selector');
    if (languageMenu) {
        languageMenu.value = language;
    }
}

const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
applyTranslation(savedLanguage);

export const translations = {
    pt: {
        home: "Início",
        tasks: "Tarefas",
        task: "Tarefa",
        todays_tasks: "Tarefas de Hoje",
        habits: "Hábitos",
        habit: "Habito",
        todays_habits: "Hábitos de Hoje",
        no_habits: "Você não tem hábitos criados, crie um agora mesmo!",
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
        which_habit: "Qual hábito?",
        task_title: "Título da tarefa",
        task_description: "Descrição da tarefa",
        create_task: "Criar Tarefa",
        create_habit: "Criar Hábito",
        new_task: "+ Nova Tarefa",
        new_habit: "+ Novo Habito",
        no_title_alert: "Não pode enviar uma tarefa sem título!",
        notes: "Notas",
        what_create: "O que criar?",
        no_type_alert: "Você tem que selecionar um tipo!",
        object_title: "Título",
        object_description: "Descrição",
        habit_title: "Título do hábito",
        habit_description: "Descrição do hábito",
    },
    en: {
        home: "Home",
        tasks: "Tasks",
        task: "Task",
        todays_tasks: "Today's Tasks",
        habits: "Habits",
        habit: "Habit",
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
        no_habits: "You don't have any habit created, create one right now!",
        day_streak: "day streak",
        days_streak: "day streak",
        which_task: "Which task?",
        which_habit: "Which habit?",
        task_title: "Task title",
        task_description: "Task description",
        create_task: "Create Task",
        create_habit: "Create Habit",
        new_task: "+ New Task",
        new_habit: "+ New Habit",
        no_title_alert: "You can't submit a task without a title!",
        notes: "Notes",
        what_create: "Create what?",
        no_type_alert: "You need to select a type!",
        object_title: "Title",
        object_description: "Description",
        habit_title: "Habit title",
        habit_description: "Habit description",
    }
};

export function applyTranslation(language) {
    const dictionary = translations[language] || translations.pt;
    localStorage.setItem('savedLanguage', language);
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (dictionary[key] !== undefined) {
            element.innerText = dictionary[key];
        }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (dictionary[key] !== undefined) {
            element.placeholder = dictionary[key];
        }
    });
    const languageMenu = document.getElementById('language-selector');
    if (languageMenu) {
        languageMenu.value = language;
    }
}

const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
applyTranslation(savedLanguage);
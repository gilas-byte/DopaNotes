export const translations = {
    pt: {
        inicio: "Início",
        tarefas_de_hoje: "Tarefas de Hoje",
        carregando: "Carregando...",
        habitos_de_hoje: "Habitos de Hoje",
        notas_rapidas: "Notas Rapidas",
        numero_notas: "0 Notas",
        projetos: "Projetos",
        numero_projetos: "0 Projetos",
        todas_feitas: "Todas feitas!",
        quase_la: "Quase lá!",
        bora_la: "Bora lá!",
        por_hoje: "Por hoje não tem nada, crie uma nova tarefa ou descanse!"
    },
    en: {
        inicio: "Home",
        tarefas_de_hoje: "Today Tasks",
        carregando: "Loading...",
        habitos_de_hoje: "Today Habits",
        notas_rapidas: "Quick Notes",
        numero_notas: "0 Notes",
        projetos: "Projects",
        numero_projetos: "0 Projects",
        todas_feitas: "All done!",
        quase_la: "Almost there!",
        bora_la: "Let's go!",
        por_hoje: "Nothing for today, create a new task of take a rest!"
    }
};

export function applyTranslation(language) {
    const elementsToTranslate = document.querySelectorAll("[data-i18n]");
    const languageMenu = document.getElementById('language-selector');
    localStorage.setItem('savedLanguage', language);
    elementsToTranslate.forEach((element) => {
        const key = element.getAttribute('data-i18n');
        element.innerText = translations[language][key]
    })
    if (languageMenu) {
        document.getElementById('language-selector').value = language;
    }
}

const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
applyTranslation(savedLanguage)
export const traducoes = {
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

export function aplicarTraducao(idioma) {
    const elementosParaTraduzir = document.querySelectorAll("[data-i18n]");
    const menuIdioma = document.getElementById('seletor-idioma');
    localStorage.setItem('idiomaSalvo', idioma);
    elementosParaTraduzir.forEach((elemento) => {
        const chave = elemento.getAttribute('data-i18n');
        elemento.innerText = traducoes[idioma][chave]
    })
    if (menuIdioma) {
        document.getElementById('seletor-idioma').value = idioma;
    }
}

const idiomaSalvo = localStorage.getItem('idiomaSalvo') || 'pt';
aplicarTraducao(idiomaSalvo)
import { verificarAPI } from "./api.js";
import { aplicarTraducao, traducoes } from "./traducao.js";

verificarAPI()

function dadosHabitos() {
    fetch("http://localhost:8000/habitos/")
        .then(resposta => resposta.json())
        .then(dados => {
            let listaDeStreaks = dados.map(habito => habito.streak)
            let maiorStreak = Math.max(...listaDeStreaks)
            if (maiorStreak === 1){
                document.getElementById("texto-streak").innerText = maiorStreak + " dia de sequência";
            } else {
                document.getElementById("texto-streak").innerText = maiorStreak + " dias de sequência";
            }
            let hoje = new Date().toISOString().split('T')[0];
            let habitosConcluidos = dados.filter(habito => 
                habito.last_check !== null && habito.last_check.split('T')[0] === hoje)
            let porcentagem = (habitosConcluidos.length / dados.length) * 100
            if (dados.length === 0) {
                document.getElementById("numero-habitos").innerText = "0"
            } else {
                document.getElementById("numero-habitos").innerText = habitosConcluidos.length + "/" + dados.length
            }
            document.getElementById("barra-habitos").style.width = porcentagem + "%"
    });
}

dadosHabitos()

function dadosTarefas() {
    fetch("http://localhost:8000/tarefas")
        .then(resposta => resposta.json())
        .then(dados => {
            const idiomaSalvo = localStorage.getItem('idiomaSalvo') || 'pt';
            let tarefasConcluidas = dados.filter(tarefa => tarefa.is_completed === true);
            let porcentagem = (tarefasConcluidas.length / dados.length) * 100;
            let textoTarefa = ""
            if (dados.length === 0) {
                document.getElementById("numero-tarefas").innerText = "0";
            } else {
                document.getElementById("numero-tarefas").innerText = tarefasConcluidas.length + "/" + dados.length;
            }
            if (porcentagem === 100) {
                textoTarefa = traducoes[idiomaSalvo].todas_feitas;
            } else if (porcentagem < 100 && porcentagem >= 50) {
                textoTarefa = traducoes[idiomaSalvo].quase_la;
            } else {
                textoTarefa = traducoes[idiomaSalvo].bora_la;
                document.getElementById("barra-tarefas").style.width = 0 + "%";
            }
            document.getElementById("barra-tarefas").style.width = porcentagem + "%"; //se for NaN no caso de não houver tarefas, ele ignora e mantém a barra-tarefas da parte de cima "0 + "%""
            document.getElementById("texto-tarefas").innerText = textoTarefa;
        })
}

dadosTarefas()
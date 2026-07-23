import { verificarAPI } from "./api.js";
import { aplicarTraducao } from "./traducao.js";

verificarAPI()

function carregarTarefas() {
    fetch ("/tarefas/")
    .then(resposta => resposta.json())
    .then(dados => {
        dados.sort((a, b) => a.is_completed - b.is_completed);
        dados.forEach((tarefa, i) => {
            const cartaoTarefa = document.createElement('div');
            cartaoTarefa.className = "bg-zinc-800/50 backdrop-blur-md p-4 rounded-xl flex items-center justify-between mb-4" ;
            const grupoBotoes = document.createElement('div') ;
            grupoBotoes.className = "flex items-center gap-3" ;
            const titulo = document.createElement('h3');
            const botaoPronto = document.createElement('button') ;
            botaoPronto.className ="w-6 h-6 rounded-full border-2 border-emerald-500" ;
            const botaoApagar = document.createElement('button') ;
            botaoApagar.className ="ph ph-trash text-zinc-100 bg-red-600/80 hover:bg-red-500 p-2 rounded-lg transition-colors cursor-pointer" ;
            if (tarefa.is_completed === true) {
                botaoPronto.classList.add("bg-emerald-500")
                cartaoTarefa.classList.remove("bg-zinc-800/50")
                cartaoTarefa.classList.add("bg-emerald-900/30")
                titulo.classList.add("line-through")
                titulo.classList.add("text-zinc-500")
            }
            botaoPronto.addEventListener('click', () => {
                botaoPronto.classList.toggle("bg-emerald-500")
                cartaoTarefa.classList.toggle("bg-zinc-800/50")
                cartaoTarefa.classList.toggle("bg-emerald-900/30")
                titulo.classList.toggle("line-through")
                titulo.classList.toggle("text-zinc-500")

                tarefa.is_completed = !tarefa.is_completed ;

                if (tarefa.is_completed === true) {
                    document.getElementById('container-tarefas').appendChild(cartaoTarefa)
                } else {
                    document.getElementById('container-tarefas').prepend(cartaoTarefa)
                }

                fetch(`http://localhost:8000/tarefas/${tarefa.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        is_completed: tarefa.is_completed
                    })
                })
            })
            botaoApagar.addEventListener('click', () => {
                fetch(`http://localhost:8000/tarefas/${tarefa.id}`, {
                    method: 'DELETE' ,
                })
                cartaoTarefa.remove()
            })
            titulo.textContent = tarefa.title;
            cartaoTarefa.appendChild(titulo)
            grupoBotoes.appendChild(botaoPronto)
            grupoBotoes.appendChild(botaoApagar)
            cartaoTarefa.appendChild(grupoBotoes)
            document.getElementById('container-tarefas').appendChild(cartaoTarefa)
            }); 
        if (dados.length === 0) {
            const cartaoVazio = document.createElement('div')
            cartaoVazio.className = "flex flex-col h-64 items-center justify-center p-4 rounded-xl mt-40 mb-4"
            const tituloVazio = document.createElement('h2');
            tituloVazio.className = "text-zinc-500 text-2xl font-bold"
            tituloVazio.innerText = "Por hoje não tem nada, crie uma nova tarefa ou descanse!";
            const iconeVazio = document.createElement('h2');
            iconeVazio.className = "text-zinc-500 ph ph-checks text-7xl font-bold text-center"
            cartaoVazio.appendChild(tituloVazio)
            cartaoVazio.appendChild(iconeVazio)
            document.getElementById('container-tarefas').appendChild(cartaoVazio)
        }
    })
}

carregarTarefas()

document.getElementById('botao-criar-tarefa').addEventListener('click', () => {
    const titulo = document.getElementById('titulo-nova-tarefa').value.trim();
    const descricao = document.getElementById('descricao-nova-tarefa').value;

    if (titulo === null || titulo === "") {
        alert("Não pode enviar uma tarefa sem titulo!");
        document.getElementById('titulo-nova-tarefa').value = ""
        document.getElementById('descricao-nova-tarefa').value = ""
        return;
    }

    fetch (`/tarefas/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titulo ,
            description: descricao
        })
    }
    )
    .then( () => {
        document.getElementById('titulo-nova-tarefa').value = ""
        document.getElementById('descricao-nova-tarefa').value = ""
        document.getElementById('container-tarefas').innerHTML = ""
        document.getElementById('modal-criacao').classList.toggle('hidden')
        carregarTarefas()
    })
})

document.getElementById('botao-abrir-modal').addEventListener('click', () => {
document.getElementById('modal-criacao').classList.toggle('hidden')
})

document.getElementById('botao-fechar-modal').addEventListener('click', () => {
document.getElementById('modal-criacao').classList.toggle('hidden')
})
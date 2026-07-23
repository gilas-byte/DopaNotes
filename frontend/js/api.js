export function verificarAPI() {
    console.log("1. Iniciou o fetch!");
    fetch("/")
        .then(resposta=> resposta.json())
        .then(dados => {
            console.log("2. Recebeu os dados!", dados);
            const cloudCheck = document.getElementById('api-check')
            cloudCheck.classList.remove('ph-cloud-x', 'text-red-500')
            cloudCheck.classList.add('ph-cloud-check', 'text-emerald-500')
        })
        .catch(erro => {
            console.error("O verdadeiro erro do fetch é:", erro);
        })
}
import { translations, applyTranslation } from "./translation.js";

export function createModal() {
    return `<div id="object-creation-modal" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center hidden">
                <div id="object-creation-interface" class="flex flex-col gap-4 bg-violet-600/20 backdrop-blur-md p-4 rounded-xl mb-6 pop-in-anim-modal">
                    <h2 data-i18n="what_create" class="text-xl font-bold">O que criar?</h2>
                    <button id="close-object-modal-button" class="bg-red-600/80 w-6 h-6 fixed top-0 -right-0.5 rounded-full hover:bg-red-500 transition">X</button>
                    <input class="bg-zinc-800 text-zinc-100 placeholder-zinc-500 p-3 rounded-lg outline-none focus:ring-2 focus:ring-violet-500" type="text" id="new-object-title" data-i18n-placeholder="object_title" placeholder="Título">
                    <textarea class="bg-zinc-800 text-zinc-100 placeholder-zinc-500 p-3 rounded-lg outline-none focus:ring-2 focus:ring-violet-500" type="text" id="new-object-description" data-i18n-placeholder="object_description" placeholder="Descrição"></textarea>
                    <div class="p-2 grid grid-cols-2 gap-4">
                        <div>
                            <label>
                                <input name="object-type" value="task" data-i18n="task" type="radio">
                                <span data-i18n="task"></span>
                            </label>
                            <label>
                                <input name="object-type" value="habit" data-i18n="habit" type="radio">
                                <span data-i18n="habit"></span>
                            </label>
                        </div>
                    </div>
                    <button id="create-object-button" data-i18n="create_task" class="rounded-full bg-emerald-900 hover:bg-emerald-800">Criar Tarefa</button>
                </div>
            </div>`
}

export function clearModal() {
    const selectedRadio = document.querySelector('input[name="object-type"]:checked');
    document.getElementById('new-object-title').value = ""
    document.getElementById('new-object-description').value = ""
    if (selectedRadio) {
        selectedRadio.checked = false;
    }
}

export function setupModalListeners(onTaskCreated, onHabitCreated, onNoteCreated) {
    const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
    applyTranslation(savedLanguage)
    document.getElementById('close-object-modal-button').addEventListener('click', () => {
    const interfaceElement = document.getElementById('object-creation-interface');
    const modalBackground = document.getElementById('object-creation-modal');
    interfaceElement.classList.add('pop-out-anim-modal');
    setTimeout(() => {
        modalBackground.classList.add('hidden');
        interfaceElement.classList.remove('pop-out-anim-modal');
        clearModal() 
        }, 200); 
    });

    document.getElementById('create-object-button').addEventListener('click', () => {
        const savedLanguage = localStorage.getItem('savedLanguage') || 'pt';
        const title = document.getElementById('new-object-title').value.trim();
        if (title === null || title === "") {
            alert(translations[savedLanguage].no_title_alert);
            clearModal();
            return;
        }
        const description = document.getElementById('new-object-description').value;
        const selectedRadio = document.querySelector('input[name="object-type"]:checked');
        let type = ""
        if (selectedRadio === null) {
            alert(translations[savedLanguage].no_type_alert);
            return;
        } else{
            type = selectedRadio.value;
        }

        console.log(title, "-", description, "-", type)

        if (type === "task") {
            fetch (`/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                title: title ,
                description: description
                })
            }
            )
            .then( () => {
                clearModal();
                document.getElementById('object-creation-modal').classList.toggle('hidden')
                onTaskCreated();
                return;
            })
        } else if (type === "habit") {
            fetch (`/habits/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                title: title ,
                description: description
                })
            })

            .then( () => {
                clearModal();
                document.getElementById('object-creation-modal').classList.toggle('hidden')
                onHabitCreated();
                return;
            })
        } else {
            alert(translations[savedLanguage].no_type_alert);
            return;
        }
    });
}
import { verifyAPI } from "./api.js";
import { applyTranslation } from "./translation.js";
import { createModal, setupModalListeners, clearModal } from './modal.js';

verifyAPI()

document.getElementById('modal-container').innerHTML = createModal();

setupModalListeners();

const languageSelector = document.getElementById('language-selector');
if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        applyTranslation(event.target.value);
    });
}

document.getElementById('open-object-modal-button').addEventListener('click', () => {
    document.getElementById('object-creation-modal').classList.toggle('hidden')
});
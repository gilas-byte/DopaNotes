import { verifyAPI } from "./api.js";
import { translations } from "./translation.js";
import { createModal, setupModalListeners, clearModal } from './modal.js';

verifyAPI()

document.getElementById('modal-container').innerHTML = createModal();

setupModalListeners();

document.getElementById('open-object-modal-button').addEventListener('click', () => {
    document.getElementById('object-creation-modal').classList.toggle('hidden')
});
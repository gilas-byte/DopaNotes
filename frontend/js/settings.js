import { verifyAPI } from "./api.js";
import { applyTranslation } from "./translation.js";

verifyAPI()

const languageSelector = document.getElementById('language-selector');
if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        applyTranslation(event.target.value);
    });
}

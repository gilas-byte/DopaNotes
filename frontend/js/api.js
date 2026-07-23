export function verifyAPI() {
    fetch("/health")
        .then(response => response.json())
        .then(data => {
            const cloudCheck = document.getElementById('api-check')
            cloudCheck.classList.remove('ph-cloud-x', 'text-red-500')
            cloudCheck.classList.add('ph-cloud-check', 'text-emerald-500')
        })
        .catch(error => {
            console.error("The real fetch error is:", error);
        })
}

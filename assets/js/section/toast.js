/* ========================================
   KC TOAST SYSTEM
======================================== */

export function initToast() {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    if (!toast || !toastMessage) {
        console.warn("[KC TOAST] Element not found.");
        return;
    }

    let toastTimer = null;

    /* SHOW TOAST */
    function showToast(message, duration = 3000) {
        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, duration);
    }

    /* TOAST EVENT */
    document.addEventListener("kc:toast", (event) => {
        showToast(event.detail?.message || "SYSTEM MESSAGE");
    });

    console.log("[KC TOAST] SYSTEM INITIALIZED.");
}

/* ========================================
   KC LOBBY INTERACTION SYSTEM
======================================== */

export function initLobby() {
    const lobby = document.querySelector("#page-lobby");

    if (!lobby) return;

    const heroVisual = lobby.querySelector(".hero-visual");
    const menuCards = lobby.querySelectorAll(".menu-card");

    /* ------------------------------------
       LOBBY INTRO REVEAL
    ------------------------------------ */

    requestAnimationFrame(() => {
        lobby.classList.add("lobby-ready");
    });

    /* ------------------------------------
       MENU ACCESS INFORMATION
    ------------------------------------ */

    const accessMessages = [
        "ACCESS DECK SYSTEM",
        "ACCESS ARCHIVE SYSTEM",
        "ACCESS LIVE NETWORK",
        "ACCESS IDENTITY SYSTEM",
    ];

    menuCards.forEach((card, index) => {
        card.setAttribute("data-access", accessMessages[index] || "ACCESS SYSTEM");
    });

    /* ------------------------------------
       CENTRAL SYSTEM MOUSE PARALLAX
    ------------------------------------ */

    if (!heroVisual) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) return;

    let animationFrame = null;

    heroVisual.addEventListener("mousemove", (event) => {
        const rect = heroVisual.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;

        cancelAnimationFrame(animationFrame);

        animationFrame = requestAnimationFrame(() => {
            heroVisual.style.setProperty("--kc-mouse-x", `${mouseX * 0.025}px`);

            heroVisual.style.setProperty("--kc-mouse-y", `${mouseY * 0.025}px`);
        });
    });

    heroVisual.addEventListener("mouseleave", () => {
        heroVisual.style.setProperty("--kc-mouse-x", "0px");
        heroVisual.style.setProperty("--kc-mouse-y", "0px");
    });
}

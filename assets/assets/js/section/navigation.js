/* ========================================
   KC PAGE NAVIGATION
======================================== */

export function initNavigation() {
    const app = document.getElementById("app");

    if (!app) {
        console.error("[KC NAV] APP element not found.");
        return;
    }

    app.addEventListener("click", (event) => {
        const button = event.target.closest("[data-page]");

        if (!button) return;

        const pageName = button.dataset.page;
        const targetPage = document.getElementById(`page-${pageName}`);

        if (!targetPage) {
            console.warn(`[KC NAV] Page not found: ${pageName}`);
            return;
        }

        // 모든 페이지 비활성화
        app.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
        });

        // 선택한 페이지 활성화
        targetPage.classList.add("active");

        // 화면 최상단으로 이동
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    console.log("[KC NAV] Navigation initialized.");
}

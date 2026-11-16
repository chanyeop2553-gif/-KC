/* ========================================
   KC AUTH + HEADER ACCOUNT SYSTEM
======================================== */

export function initAuth() {
    const modal = document.getElementById("auth-modal");
    const form = document.getElementById("auth-form");

    const nicknameInput = document.getElementById("auth-nickname");
    const idInput = document.getElementById("auth-id");
    const passwordInput = document.getElementById("auth-password");

    const message = document.getElementById("auth-message");
    const submitButton = document.getElementById("auth-submit");
    const submitText = submitButton?.querySelector("span");

    const authTabs = document.querySelectorAll("[data-auth-tab]");
    const closeButtons = document.querySelectorAll("[data-auth-close]");

    // HEADER
    const headerUser = document.getElementById("header-user");
    const headerAuthButton = document.getElementById("header-auth-button");
    const headerAccountButton = document.getElementById("header-account-button");
    const headerDuelistName = document.getElementById("header-duelist-name");
    const accountMenu = document.getElementById("header-account-menu");
    const logoutButton = document.getElementById("header-logout-button");

    if (!modal || !form || !submitButton || !idInput || !passwordInput) {
        console.error("[KC AUTH] Required elements not found.");
        return;
    }

    let authMode = "login";

    const STORAGE_KEY = "kc_duelist_account";

    /* ========================================
       ACCOUNT STORAGE
    ======================================== */

    function getAccount() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch {
            return null;
        }
    }

    function saveAccount(account) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    }

    function clearAccount() {
        localStorage.removeItem(STORAGE_KEY);
    }

    /* ========================================
       HEADER STATE
    ======================================== */

    function renderHeader() {
        const account = getAccount();
        const loggedIn = Boolean(account?.loggedIn);

        headerUser?.classList.toggle("is-logged-in", loggedIn);

        if (headerAuthButton) {
            headerAuthButton.hidden = loggedIn;
        }

        if (headerAccountButton) {
            headerAccountButton.hidden = !loggedIn;
        }

        if (headerDuelistName) {
            headerDuelistName.textContent = loggedIn
                ? account.duelistName || account.duelistId
                : "GUEST";
        }

        closeAccountMenu();

        console.log(
            loggedIn
                ? `[KC AUTH] DUELIST: ${account.duelistName || account.duelistId}`
                : "[KC AUTH] GUEST MODE",
        );
    }

    /* ========================================
       AUTH MODAL
    ======================================== */

    function openAuth() {
        setAuthMode("login");

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("auth-open");

        setTimeout(() => idInput.focus(), 150);
    }

    function closeAuth() {
        modal.classList.remove("is-open", "is-signup");
        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("auth-open");
    }

    function setAuthMode(mode) {
        authMode = mode;

        modal.classList.toggle("is-signup", mode === "signup");

        authTabs.forEach((tab) => {
            const active = tab.dataset.authTab === mode;

            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));
        });

        if (submitText) {
            submitText.textContent = mode === "signup" ? "CREATE ACCOUNT" : "LOGIN TO KC";
        }

        if (passwordInput) {
            passwordInput.autocomplete = mode === "signup" ? "new-password" : "current-password";
        }

        if (nicknameInput) {
            nicknameInput.required = mode === "signup";
        }

        if (message) {
            message.textContent = "";
            message.className = "auth-message";
        }
    }

    function showMessage(text, type = "") {
        if (!message) return;

        message.textContent = text;
        message.className = `auth-message ${type}`;
    }

    /* ========================================
       TEST AUTHENTICATION
    ======================================== */

    function authenticate() {
        if (submitButton.disabled) return;

        submitButton.disabled = true;
        submitButton.classList.add("is-loading");

        const duelistId = idInput.value.trim();
        const password = passwordInput.value;
        const duelistName = nicknameInput?.value.trim() || "";

        if (!duelistId || !password) {
            showMessage("DUELIST ID AND PASSWORD REQUIRED.", "error");

            submitButton.disabled = false;
            submitButton.classList.remove("is-loading");
            return;
        }

        let account = getAccount();

        if (authMode === "signup") {
            if (!duelistName) {
                showMessage("DUELIST NAME REQUIRED.", "error");
                nicknameInput.focus();

                submitButton.disabled = false;
                submitButton.classList.remove("is-loading");
                return;
            }

            account = {
                duelistId,
                duelistName,
                loggedIn: true,
            };

            saveAccount(account);

            showMessage("DUELIST ACCOUNT CREATED.", "success");
        } else {
            // 테스트 로그인: DUELIST ID와 비밀번호 입력만으로 로그인
            const savedName =
                account?.duelistId?.toLowerCase() === duelistId.toLowerCase()
                    ? account.duelistName
                    : duelistId;

            account = {
                duelistId,
                duelistName: savedName || duelistId,
                loggedIn: true,
            };

            saveAccount(account);

            showMessage("IDENTITY VERIFIED.", "success");
        }

        renderHeader();

        setTimeout(() => {
            closeAuth();
            form.reset();
            setAuthMode("login");

            submitButton.disabled = false;
            submitButton.classList.remove("is-loading");
        }, 500);
    }

    /* ========================================
       ACCOUNT MENU
    ======================================== */

    function openAccountMenu() {
        if (!accountMenu || !headerAccountButton) return;

        accountMenu.classList.add("is-open");
        headerAccountButton.setAttribute("aria-expanded", "true");

        accountMenu.querySelector("button")?.focus();
    }

    function closeAccountMenu(returnFocus = false) {
        accountMenu?.classList.remove("is-open");

        headerAccountButton?.setAttribute("aria-expanded", "false");

        if (returnFocus) {
            headerAccountButton?.focus();
        }
    }

    function toggleAccountMenu() {
        if (accountMenu?.classList.contains("is-open")) {
            closeAccountMenu();
        } else {
            openAccountMenu();
        }
    }

    /* ========================================
       LOGOUT
    ======================================== */

    function logout() {
        const confirmed = confirm("LOGOUT FROM KC DUELIST?");

        if (!confirmed) return;

        clearAccount();
        renderHeader();

        console.log("[KC AUTH] LOGOUT COMPLETE.");
    }

    /* ========================================
       EVENTS
    ======================================== */

    headerAuthButton?.addEventListener("click", openAuth);

    headerAccountButton?.addEventListener("click", toggleAccountMenu);

    logoutButton?.addEventListener("click", logout);

    closeButtons.forEach((button) => {
        button.addEventListener("click", closeAuth);
    });

    authTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            setAuthMode(tab.dataset.authTab);
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        authenticate();
    });

    // 메뉴 페이지 이동
    accountMenu?.querySelectorAll("[data-page]").forEach((button) => {
        button.addEventListener("click", closeAccountMenu);
    });

    // 바깥 클릭
    document.addEventListener("click", (event) => {
        if (headerUser && !headerUser.contains(event.target)) {
            closeAccountMenu();
        }
    });

    // ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (accountMenu?.classList.contains("is-open")) {
                closeAccountMenu(true);
            }

            if (modal.classList.contains("is-open")) {
                closeAuth();
            }
        }
    });

    /* ========================================
       INITIALIZE
    ======================================== */

    setAuthMode("login");
    renderHeader();

    console.log("[KC AUTH] ACCOUNT SYSTEM INITIALIZED.");
}

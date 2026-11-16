/* ========================================
   KC DUELIST ARCHIVE SYSTEM
======================================== */

export function initArchive() {
    /* =========================
       CONFIGURATION
    ========================= */

    const STORAGE_KEY = "kc-duelist-scenarios";

    /* =========================
       DOM
    ========================= */

    const createButton = document.getElementById("create-scenario-button");
    const editor = document.getElementById("scenario-editor");
    const cancelButton = document.getElementById("cancel-scenario-button");

    const form = document.getElementById("scenario-form");
    const titleInput = document.getElementById("scenario-title");
    const characterInput = document.getElementById("scenario-character");
    const contentInput = document.getElementById("scenario-content");

    const scenarioList = document.getElementById("scenario-list");

    /* CUSTOM CARD DOM */
    const cardTypeInput = document.getElementById("custom-card-type");
    const monsterFields = document.getElementById("custom-monster-fields");
    const spellFields = document.getElementById("custom-spell-fields");
    const trapFields = document.getElementById("custom-trap-fields");

    const cardNameInput = document.getElementById("custom-card-name");
    const cardAttributeInput = document.getElementById("custom-card-attribute");
    const cardRaceInput = document.getElementById("custom-card-race");
    const cardLevelInput = document.getElementById("custom-card-level");
    const cardAtkInput = document.getElementById("custom-card-atk");
    const cardDefInput = document.getElementById("custom-card-def");

    const spellTypeInput = document.getElementById("custom-spell-type");
    const trapTypeInput = document.getElementById("custom-trap-type");

    const cardEffectInput = document.getElementById("custom-card-effect");

    const addCardButton = document.getElementById("add-custom-card-button");
    const customCardList = document.getElementById("custom-card-list");

    /* DELETE MODAL DOM */
    const deleteModal = document.getElementById("scenario-delete-modal");
    const cancelDeleteButton = document.getElementById("cancel-delete-button");
    const confirmDeleteButton = document.getElementById("confirm-delete-button");

    /* =========================
       VALIDATION
    ========================= */

    if (
        !createButton ||
        !editor ||
        !cancelButton ||
        !form ||
        !titleInput ||
        !characterInput ||
        !contentInput ||
        !scenarioList
    ) {
        console.error("[KC ARCHIVE] Required DOM elements not found.");
        return;
    }

    /* =========================
       STATE
    ========================= */

    let scenarios = [];
    let customCards = [];
    let pendingDeleteId = null;

    /* =========================
       HTML ESCAPE
    ========================= */

    function escapeHTML(value) {
        return String(value ?? "").replace(
            /[&<>"']/g,
            (char) =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                })[char],
        );
    }

    /* =========================
       TOAST
    ========================= */

    function showToast(message) {
        document.dispatchEvent(
            new CustomEvent("kc:toast", {
                detail: { message },
            }),
        );
    }

    /* =========================
       STORAGE
    ========================= */

    function saveScenarios() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
        } catch (error) {
            console.error("[KC ARCHIVE] Storage save failed:", error);
            showToast("ARCHIVE SAVE FAILED");
        }
    }

    function loadScenarios() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

            scenarios = Array.isArray(saved) ? saved : [];
        } catch (error) {
            console.error("[KC ARCHIVE] Storage load failed:", error);
            scenarios = [];
        }
    }

    /* =========================
       EDITOR
    ========================= */

    function openEditor() {
        editor.classList.remove("hidden");

        titleInput.focus();

        editor.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    function closeEditor() {
        editor.classList.add("hidden");
        form.reset();

        customCards = [];

        updateCardFields();
        renderCustomCards();
    }

    /* =========================
       DATE FORMAT
    ========================= */

    function formatDate(date) {
        return new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date(date));
    }

    /* =========================
       CARD TYPE SWITCH
    ========================= */

    function updateCardFields() {
        if (!cardTypeInput) return;

        monsterFields?.classList.toggle("hidden", cardTypeInput.value !== "monster");

        spellFields?.classList.toggle("hidden", cardTypeInput.value !== "spell");

        trapFields?.classList.toggle("hidden", cardTypeInput.value !== "trap");
    }

    /* =========================
       CUSTOM CARD RENDER
    ========================= */

    function renderCustomCards() {
        if (!customCardList) return;

        if (!customCards.length) {
            customCardList.innerHTML = `
                <div class="custom-card-empty">
                    NO CUSTOM CARDS ADDED
                </div>
            `;
            return;
        }

        customCardList.innerHTML = customCards
            .map(
                (card, index) => `
                <article class="custom-card-item">

                    <div class="custom-card-item-info">

                        <span class="custom-card-item-type">
                            ${escapeHTML(card.type.toUpperCase())}
                        </span>

                        <h4>${escapeHTML(card.name)}</h4>

                        <p>
                            ${
                                card.type === "monster"
                                    ? `${escapeHTML(card.attribute)} ·
                                       ${escapeHTML(card.race)} ·
                                       LV ${escapeHTML(card.level)} ·
                                       ATK ${escapeHTML(card.atk)} /
                                       DEF ${escapeHTML(card.def)}`
                                    : card.type === "spell"
                                      ? `SPELL · ${escapeHTML(card.spellType)}`
                                      : `TRAP · ${escapeHTML(card.trapType)}`
                            }
                        </p>

                        <div class="custom-card-item-effect">
                            ${escapeHTML(card.effect || "NO EFFECT DESCRIPTION")}
                        </div>

                    </div>

                    <button
                        type="button"
                        class="remove-custom-card-button"
                        data-remove-card="${index}"
                        aria-label="Remove custom card"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </article>
            `,
            )
            .join("");
    }

    /* =========================
       ADD CUSTOM CARD
    ========================= */

    function addCustomCard() {
        const type = cardTypeInput?.value;
        const name = cardNameInput?.value.trim();
        const effect = cardEffectInput?.value.trim();

        if (!type || !name) {
            showToast("PLEASE ENTER CARD NAME AND TYPE");
            return;
        }

        const card = {
            id: crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`,

            name,
            type,
            effect,

            attribute: cardAttributeInput?.value || "",
            race: cardRaceInput?.value.trim() || "",
            level: cardLevelInput?.value || "",
            atk: cardAtkInput?.value || "",
            def: cardDefInput?.value || "",

            spellType: spellTypeInput?.value || "",
            trapType: trapTypeInput?.value || "",
        };

        /* MONSTER VALIDATION */
        if (type === "monster") {
            if (
                !card.attribute ||
                !card.race ||
                card.level === "" ||
                card.atk === "" ||
                card.def === ""
            ) {
                showToast("PLEASE COMPLETE MONSTER DETAILS");
                return;
            }
        }

        customCards.push(card);

        renderCustomCards();

        /* RESET CARD INPUTS */
        cardNameInput.value = "";
        cardEffectInput.value = "";

        if (cardAttributeInput) cardAttributeInput.value = "";
        if (cardRaceInput) cardRaceInput.value = "";
        if (cardLevelInput) cardLevelInput.value = "";
        if (cardAtkInput) cardAtkInput.value = "";
        if (cardDefInput) cardDefInput.value = "";

        showToast("CUSTOM CARD ADDED");
    }

    /* =========================
       REMOVE CUSTOM CARD
    ========================= */

    function removeCustomCard(index) {
        customCards.splice(index, 1);

        renderCustomCards();

        showToast("CUSTOM CARD REMOVED");
    }

    /* =========================
       SCENARIO RENDER
    ========================= */

    function renderScenarios() {
        if (!scenarios.length) {
            scenarioList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-book-open"></i>
                    <p>No scenarios registered yet.</p>
                </div>
            `;
            return;
        }

        scenarioList.innerHTML = scenarios
            .map(
                (scenario) => `
                <article
                    class="scenario-card"
                    data-scenario-id="${escapeHTML(scenario.id)}"
                >

                    <div class="scenario-card-header">

                        <span class="scenario-label">
                            DUELIST STORY
                        </span>

                        <button
                            class="delete-scenario-button"
                            data-delete-scenario="${escapeHTML(scenario.id)}"
                            title="Delete Scenario"
                        >
                            <i class="fa-solid fa-trash"></i>
                            DELETE
                        </button>

                    </div>

                    <h3 class="scenario-title">
                        ${escapeHTML(scenario.title)}
                    </h3>

                    ${
                        scenario.character
                            ? `
                                <p class="scenario-character">
                                    CHARACTER · ${escapeHTML(scenario.character)}
                                </p>
                            `
                            : ""
                    }

                    <p class="scenario-content">
                        ${escapeHTML(scenario.content)}
                    </p>

                    ${
                        scenario.cards?.length
                            ? `
                                <div class="scenario-card-attachments">
                                    <span>CUSTOM CARDS · ${scenario.cards.length}</span>
                                </div>
                            `
                            : ""
                    }

                    <div class="scenario-card-footer">
                        <span>CREATED BY DUELIST</span>

                        <time datetime="${escapeHTML(scenario.createdAt)}">
                            ${escapeHTML(formatDate(scenario.createdAt))}
                        </time>
                    </div>

                </article>
            `,
            )
            .join("");
    }

    /* =========================
       CREATE SCENARIO
    ========================= */

    function createScenario(event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const character = characterInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            showToast("PLEASE COMPLETE REQUIRED FIELDS");
            return;
        }

        const scenario = {
            id: crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`,

            title,
            character,
            content,

            cards: [...customCards],

            createdAt: new Date().toISOString(),
        };

        scenarios.unshift(scenario);

        saveScenarios();
        renderScenarios();
        closeEditor();

        showToast("SCENARIO PUBLISHED");

        console.log("[KC ARCHIVE] Scenario published:", scenario.title);
    }

    /* =========================
       DELETE SCENARIO
    ========================= */

    function deleteScenario(id) {
        const scenario = scenarios.find((item) => item.id === id);

        if (!scenario) return;

        scenarios = scenarios.filter((item) => item.id !== id);

        saveScenarios();
        renderScenarios();

        showToast("SCENARIO DELETED");
    }

    /* =========================
       DELETE MODAL
    ========================= */

    function openDeleteModal(id) {
        pendingDeleteId = id;

        deleteModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closeDeleteModal() {
        deleteModal.classList.add("hidden");

        document.body.style.overflow = "";

        pendingDeleteId = null;
    }

    /* =========================
       EVENTS
    ========================= */

    createButton.addEventListener("click", openEditor);

    cancelButton.addEventListener("click", closeEditor);

    form.addEventListener("submit", createScenario);

    /* CARD EVENTS */
    cardTypeInput?.addEventListener("change", updateCardFields);

    addCardButton?.addEventListener("click", addCustomCard);

    customCardList?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-card]");

        if (!button) return;

        removeCustomCard(Number(button.dataset.removeCard));
    });

    /* DELETE BUTTON */
    scenarioList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete-scenario]");

        if (!button) return;

        openDeleteModal(button.dataset.deleteScenario);
    });

    /* CANCEL DELETE */
    cancelDeleteButton?.addEventListener("click", closeDeleteModal);

    /* CONFIRM DELETE */
    confirmDeleteButton?.addEventListener("click", () => {
        if (!pendingDeleteId) return;

        deleteScenario(pendingDeleteId);
        closeDeleteModal();
    });

    /* BACKDROP CLICK */
    deleteModal
        ?.querySelector(".delete-modal-backdrop")
        ?.addEventListener("click", closeDeleteModal);

    /* ESC KEY */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && deleteModal && !deleteModal.classList.contains("hidden")) {
            closeDeleteModal();
        }
    });

    /* =========================
       INITIALIZATION
    ========================= */

    loadScenarios();
    renderScenarios();

    updateCardFields();
    renderCustomCards();

    console.log("[KC ARCHIVE] SYSTEM INITIALIZED.");
}
